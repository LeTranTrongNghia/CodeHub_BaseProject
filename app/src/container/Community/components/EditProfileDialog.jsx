import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from 'react-toastify';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const EditProfileDialog = ({ userData, onProfileUpdate }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    address: '',
    avatar: '',
    cover_photo: '',
    position: '',
    skills: [],
  });
  const [newSkill, setNewSkill] = useState('');
  const [avatarMethod, setAvatarMethod] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(formData.avatar);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || '',
        address: userData.address || '',
        avatar: userData.avatar || '',
        cover_photo: userData.cover_photo || '',
        position: userData.position || '',
        skills: userData.skills || [],
      });
      setPreviewUrl(userData.avatar || '');
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'avatar') {
      setPreviewUrl(value || userData?.avatar || '');
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        avatar: URL.createObjectURL(file)
      }));
    }
  };

  const handleAvatarMethodChange = (value) => {
    setAvatarMethod(value);
    setFormData(prev => ({ ...prev, avatar: '' }));
    setAvatarFile(null);
    setPreviewUrl(userData?.avatar || '');
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5050/users/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          address: formData.address,
          avatar: formData.avatar,
          cover_photo: formData.cover_photo,
          position: formData.position,
          skills: formData.skills,
        }),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      const updatedUser = await response.json();
      onProfileUpdate(updatedUser);
      toast.success('Profile updated successfully');
      setOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label>Avatar</Label>
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <RadioGroup
                value={avatarMethod}
                onValueChange={(value) => handleAvatarMethodChange(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="url" id="url" />
                  <Label htmlFor="url">Use URL</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upload" id="upload" />
                  <Label htmlFor="upload">Upload Image</Label>
                </div>
              </RadioGroup>
              {avatarMethod === "url" && (
                <Input
                  placeholder="Enter image URL"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                />
              )}
              {avatarMethod === "upload" && (
                <div className="flex flex-col gap-2 w-full">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    type="button"
                  >
                    Choose File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {avatarFile && (
                    <span className="text-sm text-center">
                      {avatarFile.name}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="cover_photo">Cover Photo URL</Label>
            <Input
              id="cover_photo"
              name="cover_photo"
              value={formData.cover_photo}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="skills">Skills</Label>
            <div className="flex gap-2">
              <Input
                id="skills"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
              />
              <Button type="button" onClick={handleAddSkill}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
