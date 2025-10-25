import { useUser } from "../context/UserContext";
import { useState, useEffect, useRef } from "react";
import {
  Camera,
  User,
  Mail,
  Key,
  Download,
  Shield,
  Activity,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  db,
  auth,
  storage,
} from "../firebaseConfig";
import {
  sendPasswordResetEmail,
  deleteUser,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export function ProfilePage() {
  const { user, loading, refreshUserData } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      const fullName =
        user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim();
      const nameParts = fullName.split(" ");
      setFirstName(nameParts[0] || "");
      setLastName(nameParts[1] || "");
      setUsername(user.username || user.email?.split("@")[0] || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const userRef = doc(db, "users", user.uid);
      const fullName = `${firstName} ${lastName}`.trim();
      const createdAt = user.createdAt || new Date().toLocaleString();

      await updateDoc(userRef, {
        firstName,
        lastName,
        username,
        name: fullName,
        createdAt,
      });

      await refreshUserData();
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `profilePictures/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, { photoURL: downloadURL });

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { photoURL: downloadURL });

      setPhotoURL(downloadURL);
      await refreshUserData();

      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return alert("No email found for this account.");
    try {
      await sendPasswordResetEmail(auth, user.email);
      alert(`Password reset link sent to ${user.email}. Check your inbox.`);
    } catch (error) {
      console.error(error);
      alert("Failed to send password reset email. Try again.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to permanently delete your account?")) return;
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert("Please log in again before deleting your account.");
        window.location.href = "/login";
        return;
      }

      await deleteUser(currentUser);
      await signOut(auth);
      alert("Your account has been deleted successfully.");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      if (error.code === "auth/requires-recent-login") {
        alert("For security reasons, please log in again to confirm account deletion.");
        await signOut(auth);
        window.location.href = "/login";
      } else {
        alert("Failed to delete account. Try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-xl">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-xl">
        No user logged in.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10 animate-slide-down">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold">
                Profile{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Settings
                </span>
              </h1>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Manage your account information and preferences
              </p>
            </div>
            {user.verified && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                <Shield className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Verified Account
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-elegant hover:shadow-elegant-xl transition-smooth border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-500" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and photo
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Avatar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="relative">
                    <Avatar className="relative h-28 w-28 ring-4 ring-background shadow-xl overflow-hidden">
                      {photoURL ? (
                        <img src={photoURL} alt="Profile" className="object-cover w-full h-full" />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-3xl">
                          {firstName.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg hover:scale-110 border-2 border-background"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <Camera className="h-5 w-5" />
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Profile Picture</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      PNG or JPG, up to 2MB
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl"
                      onClick={() => fileInputRef.current.click()}
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Change Photo"}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-500" />
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-500" />
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-purple-500" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email || ""}
                    readOnly
                    className="h-12 rounded-xl bg-gray-100"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>

                <Button
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6 text-base rounded-xl"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Account Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-emerald-500" /> Account Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="text-lg font-bold">
                    {user.createdAt || new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground">Total Analyses</p>
                  <p className="text-lg font-bold">{user.totalAnalyses || 0}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  <p className="text-lg font-bold">
                    {user.accuracyRate ? `${user.accuracyRate}%` : "0%"}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground">Weekly Analyses</p>
                  <p className="text-lg font-bold">{user.weeklyAnalyses || 0}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-rose-500" /> Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 rounded-xl"
                  onClick={handlePasswordReset}
                >
                  <Key className="mr-2 h-5 w-5" />
                  Change Password
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start h-12 rounded-xl"
                  onClick={() => alert("Data download feature coming soon!")}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Data
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-rose-600 h-12 rounded-xl"
                  onClick={handleDeleteAccount}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
