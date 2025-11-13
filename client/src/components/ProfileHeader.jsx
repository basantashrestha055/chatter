import React, { useRef, useState } from 'react';
import { LogOut, Moon, SunMoon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';

const ProfileHeader = () => {
  const { authUser, logout, updateUser } = useAuthStore();
  const { setTheme, theme } = useThemeStore();

  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Img = reader.result;
      setSelectedImg(base64Img);
      await updateUser({
        profilePic: base64Img,
      });
    };
  };

  return (
    <div className='flex items-center justify-between px-5 py-6 border-b border-accent'>
      <div className='flex items-center gap-4'>
        <div className='avatar online w-10 h-10'>
          <button onClick={() => fileInputRef.current.click()}>
            <img
              src={selectedImg || authUser.profilePic || '/default.jpg'}
              alt='user-img'
              className='w-full rounded-full'
            />

            <input
              type='file'
              accept='image/*'
              ref={fileInputRef}
              onChange={handleImageUpload}
              className='hidden'
            />
          </button>
        </div>
        <div>
          <h3 className='text-sm font-semibold'>{authUser.fullName}</h3>
          <span className='text-xs'>Online</span>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <LogOut className='cursor-pointer' onClick={logout} />
        <div className='cursor-pointer' onClick={setTheme}>
          {theme === 'dark' ? <Moon /> : <SunMoon />}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
