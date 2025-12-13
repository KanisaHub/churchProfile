export interface Diocese {
  id: string;
  name: string;
  bishop: string;
  location: string;
  districts: District[];
}

export interface District {
  id: string;
  name: string;
  superintendent: string;
  dioceseId: string;
  churches: Church[];
}

export interface Church {
  id: string;
  name: string;
  pastor: string;
  address: string;
  phone: string;
  email: string;
  foundedYear: number;
  districtId: string;
  about: string;
  history: string;
  missionChurches: MissionChurch[];
  members: Member[];
  departments: Department[];
  weeklySchedule: ScheduleItem[];
  gallery: GalleryImage[];
  offerings: WeeklyOffering[];
}

export interface MissionChurch {
  id: string;
  name: string;
  leader: string;
  address: string;
  parentChurchId: string;
  memberCount: number;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  role: string;
  status: 'active' | 'inactive';
  churchId: string;
}

export interface Department {
  id: string;
  name: string;
  leader: string;
  description: string;
  memberCount: number;
}

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  activity: string;
  location: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  date: string;
}

export interface WeeklyOffering {
  id: string;
  date: string;
  tithe: number;
  offering: number;
  specialOffering: number;
  missionOffering: number;
  total: number;
  notes: string;
}
