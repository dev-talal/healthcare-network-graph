export type HCPNode = {
    id: string;
    name: string;
    title: string;
    avatar: string;
    type: 'physician' | 'researcher' | 'administrator';
    education: string[];
    experience: string[];
    publications: string[];
    color?: string;
    x?: number;
    y?: number;
};
  
export type HCPLink = {
    source: string;
    target: string;
    type: 'co-author' | 'colleague' | 'collaborator';
    details: string;
    strength?: number;
};