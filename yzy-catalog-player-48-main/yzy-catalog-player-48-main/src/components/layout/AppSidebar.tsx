import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Music, Heart, Settings, Lock, User, Sun, Moon, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "All Releases", url: "/releases", icon: Music },
  { title: "Liked Songs", url: "/liked", icon: Heart },
  { title: "Profiles", url: "/profiles", icon: User },
  { title: "Admin Panel", url: "/admin", icon: Settings, locked: true },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => currentPath === path;

  const handleProfilesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      navigate(`/profiles/${user.username}`);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar-background">
        {/* YZY Branding */}
        <div className="p-6 border-b border-sidebar-border">
          {!isCollapsed && (
            <div className="space-y-1">
              <h1 className="yzy-title text-sidebar-foreground">YZYPlayer</h1>
              <p className="yzy-subtitle text-sidebar-foreground/60">
                https://discord.gg/5qC4NQmPdv
              </p>
            </div>
          )}
          {isCollapsed && (
            <div className="text-center">
              <span className="text-lg font-black text-sidebar-foreground">YZY</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent className="p-4">
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.title === "Profiles" ? (
                      <button
                        onClick={handleProfilesClick}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group w-full text-left ${
                          currentPath.includes('/profiles')
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover-glow"
                        }`}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          {!isCollapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                        </div>
                      </button>
                    ) : (
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group ${
                            isActive
                              ? "bg-sidebar-primary text-sidebar-primary-foreground"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover-glow"
                          }`
                        }
                      >
                        <div className="flex items-center gap-3 w-full">
                          {item.locked ? (
                            <Lock className="h-5 w-5 flex-shrink-0" />
                          ) : (
                            <item.icon className="h-5 w-5 flex-shrink-0" />
                          )}
                          {!isCollapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                        </div>
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Controls */}
        <div className="mt-auto p-4 space-y-2 border-t border-sidebar-border">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 mr-2" />
            ) : (
              <Moon className="h-4 w-4 mr-2" />
            )}
            {!isCollapsed && (
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            )}
          </Button>

          {/* User Controls */}
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {!isCollapsed && <span>Logout</span>}
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/login')}
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <User className="h-4 w-4 mr-2" />
              {!isCollapsed && <span>Login</span>}
            </Button>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}