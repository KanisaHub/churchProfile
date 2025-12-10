export interface Member {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface MissionChurch {
  id: string;
  name: string;
  location: string;
  leader: string;
  memberCount: number;
  establishedDate: string;
  members: Member[];
}

export interface Church {
  id: string;
  name: string;
  location: string;
  pastor: string;
  memberCount: number;
  missionChurchCount: number;
  establishedDate: string;
  missionChurches: MissionChurch[];
}

export interface District {
  id: string;
  name: string;
  superintendent: string;
  churchCount: number;
  totalMembers: number;
  location: string;
  churches: Church[];
}

export interface Diocese {
  name: string;
  bishop: string;
  districts: District[];
}

const generateMembers = (count: number, prefix: string): Member[] => {
  const roles = [
    'Elder',
    'Deacon',
    'Choir Member',
    'Youth Leader',
    'Sunday School Teacher',
    'Member',
  ];
  const statuses: ('active' | 'inactive')[] = [
    'active',
    'active',
    'active',
    'inactive',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-member-${i + 1}`,
    name: `Member ${i + 1}`,
    role: roles[i % roles.length],
    phone: `+255 7${Math.floor(Math.random() * 90000000 + 10000000)}`,
    email: `member${i + 1}@example.com`,
    joinDate: `${2015 + Math.floor(Math.random() * 9)}-${String(
      Math.floor(Math.random() * 12) + 1
    ).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(
      2,
      '0'
    )}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

const generateMissionChurches = (
  count: number,
  churchId: string
): MissionChurch[] => {
  const locations = [
    'Village A',
    'Village B',
    'Settlement C',
    'Area D',
    'Zone E',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `${churchId}-mission-${i + 1}`,
    name: `${locations[i % locations.length]} Mission`,
    location: `${locations[i % locations.length]}, Arusha`,
    leader: `Leader ${i + 1}`,
    memberCount: Math.floor(Math.random() * 50) + 20,
    establishedDate: `${2018 + Math.floor(Math.random() * 5)}`,
    members: generateMembers(
      Math.floor(Math.random() * 30) + 15,
      `${churchId}-mission-${i + 1}`
    ),
  }));
};

const generateChurches = (districtId: string, count: number): Church[] => {
  const churchNames = [
    "St. Peter's Church",
    'Grace Community Church',
    'Faith Fellowship',
    'Hope Assembly',
    'Living Waters Church',
    'New Life Church',
    'Emmanuel Church',
    'Bethel Church',
    'Zion Church',
    'Trinity Church',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `${districtId}-church-${i + 1}`,
    name: churchNames[i % churchNames.length],
    location: `Area ${i + 1}, Arusha`,
    pastor: `Pastor ${['John', 'James', 'Peter', 'Paul', 'David'][i % 5]} ${
      ['Mushi', 'Kimaro', 'Massawe', 'Lyimo', 'Mrema'][i % 5]
    }`,
    memberCount: Math.floor(Math.random() * 300) + 100,
    missionChurchCount: Math.floor(Math.random() * 4) + 1,
    establishedDate: `${1990 + Math.floor(Math.random() * 30)}`,
    missionChurches: generateMissionChurches(
      Math.floor(Math.random() * 4) + 1,
      `${districtId}-church-${i + 1}`
    ),
  }));
};

export const arushadiocese: Diocese = {
  name: 'Arusha Districts',
  bishop: 'Bishop Dr. Stephen Gobrey',
  districts: [
    {
      id: 'arusha-central',
      name: 'Arusha Central District',
      superintendent: 'Rev. Daniel Mollel',
      churchCount: 8,
      totalMembers: 2450,
      location: 'Central Arusha',
      churches: generateChurches('arusha-central', 8),
    },
    {
      id: 'arusha-east',
      name: 'Arusha East District',
      superintendent: 'Rev. Sarah Kimaro',
      churchCount: 6,
      totalMembers: 1820,
      location: 'Eastern Arusha',
      churches: generateChurches('arusha-east', 6),
    },
    {
      id: 'arusha-west',
      name: 'Arusha West District',
      superintendent: 'Rev. Michael Mushi',
      churchCount: 7,
      totalMembers: 2100,
      location: 'Western Arusha',
      churches: generateChurches('arusha-west', 7),
    },
    {
      id: 'meru-north',
      name: 'Meru North District',
      superintendent: 'Rev. Grace Pallangyo',
      churchCount: 5,
      totalMembers: 1560,
      location: 'Northern Meru',
      churches: generateChurches('meru-north', 5),
    },
    {
      id: 'meru-south',
      name: 'Meru South District',
      superintendent: 'Rev. Joseph Swai',
      churchCount: 6,
      totalMembers: 1890,
      location: 'Southern Meru',
      churches: generateChurches('meru-south', 6),
    },
  ],
};
