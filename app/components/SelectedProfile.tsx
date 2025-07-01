import { forwardRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import { ReactSVG } from 'react-svg';
import { mockNodes } from '~/constants/mockupData';
import { useAppContext } from '~/context/AppContext';
import { useWindowSize } from '~/hooks/windowSize';

const SelectedProfile = forwardRef<HTMLDivElement>((_, ref) => {
    const { setSearchTerm, setSelectedLink, selectedNode, selectedLink, searchTerm, setSelectedNode, showSidebar, setShowSidebar } = useAppContext();
    const { width } = useWindowSize();
    const handleSearch = useCallback(() => {
        const foundNode = mockNodes.find(node =>
            node.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (foundNode) {
            setSelectedNode(foundNode);
            setSelectedLink(null);
            setShowSidebar(false);
            toast.success(`Record found: ${foundNode.name}`);
        }
        else {
            toast.error('Record not found');
        }
    }, [searchTerm]);

    return (
        <>
            <div className={`w-[${width > 1023 || showSidebar ? '360' : '0'}px] ${!showSidebar && width < 1023 && 'hidden'} transition z-[999] h-full fixed lg:static flex-shrink-0 bg-white p-6 border-r border-gray-200 overflow-y-auto`} ref={ref}>
                <div className='flex items-center mb-6 justify-between'>
                    <h1 className="text-2xl font-bold text-gray-800">Healthcare Network</h1>
                    {width < 1023 && (
                        <ReactSVG src="/images/svg/cancel.svg" className="text-gray-400 hover:text-gray-500 cursor-pointer" onClick={() => setShowSidebar(false)} />
                    )}
                </div>
                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search HCP by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-2 top-2 bg-blue-600 text-white p-1 rounded-md hover:bg-blue-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Node/Link Details */}
                {selectedLink ? (
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <h3 className="font-bold text-blue-800 mb-2">Connection Details</h3>
                        <p className="text-sm text-gray-700 mb-3">{selectedLink.details}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                {selectedLink.type}
                            </span>
                            <button
                                onClick={() => setSelectedLink(null)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                Back to profile
                            </button>
                        </div>
                    </div>
                ) : selectedNode ? (
                    <>
                        {/* Node Profile */}
                        <div className="flex items-start mb-6">
                            <img
                                src={selectedNode.avatar}
                                alt={selectedNode.name}
                                className="w-16 h-16 rounded-full border-2 border-white shadow-sm"
                            />
                            <div className="ml-4">
                                <h2 className="text-xl font-bold text-gray-800">{selectedNode.name}</h2>
                                <p className="text-sm text-gray-600">{selectedNode.title}</p>
                                <div className="mt-1">
                                    <span className={`inline-block px-2 py-1 text-xs rounded-full capitalize ${selectedNode.type === 'physician' ? 'bg-blue-100 text-blue-800' :
                                        selectedNode.type === 'researcher' ? 'bg-green-100 text-green-800' :
                                            'bg-purple-100 text-purple-800'
                                        }`}>
                                        {selectedNode.type}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                                <ReactSVG src="/images/svg/education.svg" />
                                Education
                            </h3>
                            <ul className="space-y-2">
                                {selectedNode.education.map((edu: string, i: number) => (
                                    <li key={i} className="text-sm text-gray-600 flex items-start">
                                        <ReactSVG src="/images/svg/checkmark.svg" />
                                        {edu}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Experience */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                                <ReactSVG src="/images/svg/experience.svg" />
                                Experience
                            </h3>
                            <ul className="space-y-2">
                                {selectedNode.experience.map((exp: string, i: number) => (
                                    <li key={i} className="text-sm text-gray-600 flex items-start">
                                        <ReactSVG src="/images/svg/checkmark.svg" />
                                        {exp}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Publications */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                                <ReactSVG src="/images/svg/publications.svg" />
                                Publications
                            </h3>
                            <ul className="space-y-2">
                                {selectedNode.publications.map((pub: string, i: number) => (
                                    <li key={i} className="text-sm text-gray-600 flex items-start">
                                        <ReactSVG src="/images/svg/checkmark.svg" />
                                        {pub}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        Select a node to view details
                    </div>
                )}
            </div>
            {width < 1023 && !showSidebar && (
                <div className="rounded-full shadow-sm flex items-center justify-center bg-white border-r border-gray-200 h-[50px] w-[50px] fixed z-[999] top-[10px] left-[10px] transition" onClick={() => setShowSidebar(true)}>
                    <ReactSVG src="/images/svg/search.svg" className="text-gray-400 hover:text-gray-500 cursor-pointer" />
                </div>
            )}
        </>
    )
});

export default SelectedProfile;