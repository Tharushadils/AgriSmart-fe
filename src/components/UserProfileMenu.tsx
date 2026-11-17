import { useState, useEffect, useRef, type FC } from 'react';
import { User, ChevronDown, Layers, LogOut } from 'lucide-react';

export interface UserProfileData {
  name: string;
  role: string;
  email: string;
  initials: string;
}

export const UserProfileMenu: FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfileData | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userRaw = localStorage.getItem('user');
    if (userRaw) {
      try {
        const u = JSON.parse(userRaw);
        setCurrentUser({
          name: u.fullName || u.name || 'Manager',
          role: u.role || u.roles?.[0] || 'MANAGER',
          email: u.email || '',
          initials: (u.fullName || u.name || 'MG').slice(0, 2).toUpperCase(),
        });
      } catch {
       
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const profileName = currentUser?.name || 'Manager';
  const profileRole = currentUser?.role || 'MANAGER';
  const profileEmail = currentUser?.email || '';
  const profileInitials = currentUser?.initials || (profileName ? profileName.slice(0, 2).toUpperCase() : 'MG');

  return (
    <div className="user-profile-menu" ref={profileMenuRef}>
      <button
        type="button"
        className="user-profile-btn"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        aria-expanded={isProfileOpen}
        title={`User: ${profileName} (${profileRole})`}
      >
        <div className="user-avatar-circle">
          <span>{profileInitials || <User size={14} />}</span>
          <span className="user-status-dot" />
        </div>
        {profileName && <span className="user-profile-name">{profileName}</span>}
        <ChevronDown size={14} />
      </button>

      <div className={`profile-dropdown ${isProfileOpen ? 'show' : ''}`}>
        <div className="dropdown-header">
          <div className="dropdown-title">{profileName}</div>
          <div className="dropdown-subtitle">{profileRole} {profileEmail ? `• ${profileEmail}` : ''}</div>
        </div>
        <a href="/managerdashboard" className="dropdown-link">
          <Layers size={15} />
          <span>Manager Dashboard</span>
        </a>
        <a href="/allocation" className="dropdown-link">
          <Layers size={15} />
          <span>Allocation Hub</span>
        </a>
        <a href="/user" className="dropdown-link">
          <User size={15} />
          <span>Stakeholders</span>
        </a>
        <div className="dropdown-divider" />
        <a href="/login" className="dropdown-link" style={{ color: '#ef4444' }}>
          <LogOut size={15} />
          <span>Log Out</span>
        </a>
      </div>
    </div>
  );
};

export default UserProfileMenu;

