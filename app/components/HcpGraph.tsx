import { useState, useEffect, useRef, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useWindowSize } from '~/hooks/windowSize';
import type { HCPLink, HCPNode } from '~/types/mockesType';
import { useAppContext } from '~/context/AppContext';
import { mockLinks, mockNodes, normalizeLinks } from '~/constants/mockupData';

const NetworkGraph = ({ leftContentSize }: { leftContentSize: number }) => {
  const [graphData, setGraphData] = useState<{ nodes: HCPNode[]; links: HCPLink[] }>({ nodes: [], links: [] });
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverLink, setHoverLink] = useState<HCPLink | null>(null);
  const fgRef = useRef<any>(null);
  const avatarCache = useRef<Record<string, HTMLImageElement>>({});
  const { width, height } = useWindowSize();
  const { setSelectedNode, setSelectedLink, selectedNode, setShowSidebar } = useAppContext();

  useEffect(() => {
    setGraphData({ nodes: mockNodes, links: normalizeLinks(mockLinks) });
    setSelectedNode(mockNodes[0]);
  }, []);

  useEffect(() => {
    mockNodes.forEach(node => {
      if (node.avatar && !avatarCache.current[node.avatar]) {
        const img = new Image();
        img.src = node.avatar;
        avatarCache.current[node.avatar] = img;
      }
    });
  }, []);

  // Center and zoom on selected node
  useEffect(() => {
    if (selectedNode && fgRef.current) {
      fgRef.current.centerAt(selectedNode.x || 0, selectedNode.y || 0, 1000);
      fgRef.current.zoom(width < 1023 ? 8 : 18, 1000);

      // Highlight connected nodes
      const connectedNodes = new Set([selectedNode.id]);
      const connectedLinks = new Set();

      graphData.links.forEach((link: any) => {
        if (link.source === selectedNode.id || link.source?.id === selectedNode.id) {
          connectedNodes.add(link.source);
          connectedNodes.add(link.target);
          connectedLinks.add(link);
        }
      });

      setHighlightNodes(connectedNodes);
      setHighlightLinks(connectedLinks);
    }
  }, [selectedNode]);

  // Handle link hover
  const handleLinkHover = (link: HCPLink | null) => {
    setHoverLink(link);
    if (!link) return;
  };

  // Custom node painting
  const paintNode = useCallback((node: HCPNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
    if (!node.x || !node.y) return;

    const isSelected = selectedNode?.id === node.id;
    const isHighlighted = highlightNodes.has(node.id);
    const size = isSelected ? 6 : isHighlighted ? 5 : 4;

    // Draw outer circle (highlight ring)
    if (isSelected || isHighlighted) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, size + 3, 0, 2 * Math.PI, false);
      ctx.fillStyle = isSelected ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)';
      ctx.fill();
    }

    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
    ctx.fillStyle = node.color || '#ccc';
    ctx.fill();

    // Draw border
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    // Draw avatar from cache
    if (node.avatar && avatarCache.current[node.avatar]) {
      const img = avatarCache.current[node.avatar];
      if (img.complete) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, size - 1, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(
          img,
          node.x - (size - 1),
          node.y - (size - 1),
          (size - 1) * 2,
          (size - 1) * 2
        );
        ctx.restore();
      }
    }
  }, [selectedNode, highlightNodes]);


  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 relative overflow-hidden">
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          width={width > 1023 ? width - leftContentSize : width}
          height={height}
          nodeLabel="name"
          nodeAutoColorBy="type"
          linkDirectionalArrowLength={0}
          linkDirectionalArrowRelPos={1}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={2}
          linkDirectionalParticleSpeed={0.01}
          nodeRelSize={8}
          cooldownTicks={100}
          onEngineStop={() => fgRef.current?.zoomToFit(400)}
          linkWidth={link =>
            hoverLink?.source === link.source && hoverLink?.target === link.target
              ? 4
              : highlightLinks.has(link)
                ? 3
                : 1 + (link.strength || 0.5)
          }
          linkColor={link =>
            hoverLink?.source === link.source && hoverLink?.target === link.target
              ? 'rgba(239, 68, 68, 0.8)'
              : highlightLinks.has(link)
                ? 'rgba(59, 130, 246, 0.6)'
                : 'rgba(200, 200, 200, 0.4)'
          }
          nodeCanvasObject={paintNode}
          onNodeClick={node => {
            setSelectedNode(node);
            setSelectedLink(null);
          }}
          onLinkClick={link => {
            setSelectedLink(link);
            if (width < 1023) setShowSidebar(true);
          }}
          onLinkHover={handleLinkHover}
        />
      </div>
    </div>
  );
};

export default NetworkGraph;