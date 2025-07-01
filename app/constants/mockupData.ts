import type { HCPLink, HCPNode } from "~/types/mockesType";

export const mockNodes: HCPNode[] = [
  {
    id: "dr-daniel-smith-0",
    name: "Dr. Daniel Smith",
    title: "Cardiologist, NIH",
    avatar: "https://randomuser.me/api/portraits/women/76.jpg",
    type: "researcher",
    education: ["MD, City Medical", "Residency, Memorial Hospital"],
    experience: ["Cardiologist, NIH (2016-present)", "Fellow, Harvard Medical School (2011-2018)"],
    publications: ["Study on oncology (2024)", "Breakthrough in immunotherapy (2020)"],
    color: "#6366f1"
  },
  {
    id: "dr-emily-smith-1",
    name: "Dr. Emily Smith",
    title: "Psychiatrist, Mayo Clinic",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    type: "physician",
    education: ["MD, City Medical", "Residency, Children's Hospital"],
    experience: ["Psychiatrist, Mayo Clinic (2017-present)", "Fellow, Harvard Medical School (2014-2018)"],
    publications: ["Study on neurology (2021)", "Breakthrough in genomics (2019)"],
    color: "#f59e0b"
  },
  {
    id: "dr-olivia-johnson-2",
    name: "Dr. Olivia Johnson",
    title: "Neurologist, Johns Hopkins",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    type: "physician",
    education: ["MD, Global University", "Residency, Saint Mary's"],
    experience: ["Neurologist, Johns Hopkins (2015-present)", "Fellow, Harvard Medical School (2009-2014)"],
    publications: ["Study on neurology (2022)", "Breakthrough in genomics (2020)"],
    color: "#10b981"
  },
  {
    id: "dr-liam-williams-3",
    name: "Dr. Liam Williams",
    title: "Oncologist, Stanford Health",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    type: "researcher",
    education: ["MD, Harvard Med", "Residency, Children's Hospital"],
    experience: ["Oncologist, Stanford Health (2014-present)", "Resident, Cleveland Clinic (2006-2010)"],
    publications: ["Study on oncology (2023)", "Breakthrough in AI diagnostics (2021)"],
    color: "#ef4444"
  },
  {
    id: "dr-ava-brown-4",
    name: "Dr. Ava Brown",
    title: "Pediatrician, Mayo Clinic",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    type: "physician",
    education: ["MD, City Medical", "Residency, Memorial Hospital"],
    experience: ["Pediatrician, Mayo Clinic (2018-present)", "Fellow, Harvard Medical School (2012-2016)"],
    publications: ["Study on pediatrics (2022)", "Breakthrough in genomics (2018)"],
    color: "#6366f1"
  },
  {
    id: "dr-zoe-jackson-29",
    name: "Dr. Zoe Jackson",
    title: "Neurologist, NIH",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    type: "researcher",
    education: ["MD, Global University", "Residency, Saint Mary's"],
    experience: ["Neurologist, NIH (2016-present)", "Resident, Cleveland Clinic (2010-2015)"],
    publications: ["Study on neurology (2021)", "Breakthrough in immunotherapy (2019)"],
    color: "#f59e0b"
  },
  {
    id: "dr-john-doe-30",
    name: "Dr. John Doe",
    title: "Neurologist, NIH",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    type: "physician",
    education: ["MD, Glasgow University", "Residency, Saint Mary's"],
    experience: ["Neurologist, NIH (2016-present)", "Resident, Cleveland Clinic (2010-2015)"],
    publications: ["Study on neurology (2021)", "Breakthrough in immunotherapy (2019)"],
    color: "#gc5c35"
  }
];
  
export const mockLinks: HCPLink[] = [
  
  { source: "dr-liam-williams-3", target: "dr-emily-smith-1", type: "collaborator", details: "Worked on 1 project", strength: 0.5 },
  { source: "dr-daniel-smith-0", target: "dr-zoe-jackson-29", type: "co-author", details: "Worked on 3 papers", strength: 0.72 },
  { source: "dr-ava-brown-4", target: "dr-liam-williams-3", type: "collaborator", details: "Teamed up for 2 studies", strength: 0.66 },
  { source: "dr-olivia-johnson-2", target: "dr-daniel-smith-0", type: "co-author", details: "Researched AI together", strength: 0.8 },
  { source: "dr-emily-smith-1", target: "dr-olivia-johnson-2", type: "collaborator", details: "2 joint publications", strength: 0.61 },
  { source: "dr-zoe-jackson-29", target: "dr-liam-williams-3", type: "co-author", details: "Oncology partnership", strength: 0.77 },
  { source: "dr-daniel-smith-0", target: "dr-emily-smith-1", type: "co-author", details: "Collaboration on neurology", strength: 0.68 },
  { source: "dr-ava-brown-4", target: "dr-zoe-jackson-29", type: "collaborator", details: "Worked on pediatrics", strength: 0.55 },
  { source: "dr-olivia-johnson-2", target: "dr-liam-williams-3", type: "co-author", details: "Cancer research", strength: 0.73 },
  { source: "dr-john-doe-30", target: "dr-zoe-jackson-29", type: "co-author", details: "Cancer research", strength: 0.57 },
  { source: "dr-daniel-smith-0", target: "dr-john-doe-30", type: "co-author", details: "Medical research", strength: 0.57 },

];
  
export const normalizeLinks = (links: any[]): HCPLink[] => {
  return links.map(link => ({
    ...link,
    source: typeof link.source === 'string' ? link.source : link.source.id,
    target: typeof link.target === 'string' ? link.target : link.target.id
  }));
};