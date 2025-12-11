import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import {
  Church,
  MapPin,
  Users,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Building2,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react';
import { cn } from '~/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { arushadiocese } from '~/components/data';

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ isCollapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();
  const [districtsOpen, setDistrictsOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;
  const isDistrictActive = location.pathname.includes('/district/');

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-gradient-to-b from-primary to-primary/90 transition-all duration-300 flex flex-col border-r border-border',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-primary-foreground/10">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-lg">
          <Church className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <div className="animate-fade-in">
            <h1 className="text-lg font-semibold text-primary-foreground leading-tight">
              Arusha Diocese
            </h1>
            <p className="text-xs text-primary-foreground/70">
              Management System
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all',
            isActive('/dashboard')
              ? 'bg-primary-foreground/10 text-primary-foreground font-medium'
              : 'text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground'
          )}
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Dashboard</span>}
        </NavLink>

        {/* Districts Section */}
        <Collapsible>
          <NavLink
            to="/districts"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg w-full transition-all',
              isDistrictActive
                ? 'bg-primary-foreground/10 text-primary-foreground font-medium'
                : 'text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground'
            )}
          >
            <Building2 className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="font-medium">Districts</span>}
          </NavLink>
        </Collapsible>

        {/* Members */}
        <NavLink
          to="/members"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg mt-1 transition-all',
            isActive('/members')
              ? 'bg-primary-foreground/10 text-primary-foreground font-medium'
              : 'text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground'
          )}
        >
          <Users className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="font-medium">All Members</span>}
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg mt-1 transition-all',
            isActive('/settings')
              ? 'bg-primary-foreground/10 text-primary-foreground font-medium'
              : 'text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground'
          )}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Settings</span>}
        </NavLink>
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-primary-foreground/10">
        <div
          className={cn(
            'flex items-center gap-3 p-2 rounded-lg bg-primary-foreground/5',
            isCollapsed && 'justify-center'
          )}
        >
          <Avatar className="w-9 h-9 border-2 border-primary-foreground/20">
            <AvatarFallback className="bg-primary-foreground text-primary text-sm font-medium">
              AD
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary-foreground truncate">
                Admin User
              </p>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-primary-foreground/70">
                  Diocese Admin
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
