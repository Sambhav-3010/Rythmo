"use client";

import { useState } from "react";
import {
  IoCloudUpload,
  IoBarChart,
  IoLogoUsd,
  IoPerson,
  IoTrendingUp,
  IoMusicalNotes,
  IoPlay,
  IoEye,
} from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
const uploadedTracks = [
  {
    id: "1",
    title: "Midnight Echoes",
    status: "Published",
    plays: 12500,
    likes: 890,
    revenue: 45.2,
    uploadDate: "2024-01-10",
  },
  {
    id: "2",
    title: "Digital Dreams",
    status: "Processing",
    plays: 0,
    likes: 0,
    revenue: 0,
    uploadDate: "2024-01-15",
  },
  {
    id: "3",
    title: "Cosmic Journey",
    status: "Published",
    plays: 8900,
    likes: 567,
    revenue: 32.15,
    uploadDate: "2024-01-08",
  },
];

export function StudioContent() {
  const [dragActive, setDragActive] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [album, setAlbum] = useState("");
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSongUpload = async (e) => {
    const {user} = useContext(AuthContext);
    e.preventDefault();
    if (!title || !file) {
      setMessage("Please provide a title and select an audio file.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("fil", file);
    formData.append("user", user._id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/songsUpload/upload`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // If not JSON, get text and throw error to see backend HTML error page
        const text = await response.text();
        throw new Error(`Server error: ${text}`);
      }

      if (response.ok) {
        setMessage("Upload successful");
        setTitle("");
        setAlbum("");
        setCover(null);
        setFile(null);
      } else {
        setMessage(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("Something went wrong during upload");
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Creator Studio
          </h1>
          <p className="text-gray-400">
            Manage your music and track performance
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="glass-card border-0 rounded-2xl p-1">
          <TabsTrigger value="overview" className="rounded-xl">
            Overview
          </TabsTrigger>
          <TabsTrigger value="tracks" className="rounded-xl">
            My Tracks
          </TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-xl">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="upload" className="rounded-xl">
            Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Plays
                </CardTitle>
                <IoPlay className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">21,400</div>
                <p className="text-xs text-green-400">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <IoLogoUsd className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$77.35</div>
                <p className="text-xs text-green-400">+8% from last month</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Followers</CardTitle>
                <IoPerson className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-green-400">+15% from last month</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tracks</CardTitle>
                <IoMusicalNotes className="h-4 w-4 text-pink-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-gray-400">Published tracks</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IoTrendingUp className="h-5 w-5 text-blue-400" />
                Recent Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedTracks
                  .filter((track) => track.status === "Published")
                  .map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                    >
                      <div>
                        <h3 className="font-medium">{track.title}</h3>
                        <p className="text-sm text-gray-400">
                          {track.plays.toLocaleString()} plays
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-400">
                          ${track.revenue}
                        </p>
                        <p className="text-sm text-gray-400">
                          {track.likes} likes
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracks" className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <IoMusicalNotes className="h-6 w-6 text-purple-400" />
            <h2 className="text-2xl font-bold">My Tracks</h2>
          </div>

          <div className="space-y-4">
            {uploadedTracks.map((track) => (
              <Card key={track.id} className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                        <IoMusicalNotes className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{track.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge
                            variant={
                              track.status === "Published"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              track.status === "Published"
                                ? "bg-green-500/20 text-green-300"
                                : "bg-yellow-500/20 text-yellow-300"
                            }
                          >
                            {track.status}
                          </Badge>
                          <span className="text-sm text-gray-400">
                            Uploaded {track.uploadDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-xl font-bold">
                          {track.plays.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">Plays</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">{track.likes}</div>
                        <div className="text-sm text-gray-400">Likes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-400">
                          ${track.revenue}
                        </div>
                        <div className="text-sm text-gray-400">Revenue</div>
                      </div>
                      <Button
                        variant="outline"
                        className="glass-button rounded-xl"
                      >
                        <IoEye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <IoBarChart className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold">Analytics</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Plays Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-400">
                  Chart visualization would go here
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Streaming Revenue</span>
                    <span className="font-bold">$65.20</span>
                  </div>
                  <Progress value={84} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Download Revenue</span>
                    <span className="font-bold">$12.15</span>
                  </div>
                  <Progress value={16} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <IoCloudUpload className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-bold">Upload New Track</h2>
          </div>

          <Card className="glass-card border-0">
            <form onSubmit={handleSongUpload} className="space-y-6">
              <CardContent className="p-8">
                <div
                  className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
                    dragActive
                      ? "border-purple-400 bg-purple-500/10"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IoCloudUpload className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Drop your music here
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Drag and drop your audio files, or click to browse
                  </p>
                  <h1>Enter the track title</h1>
                  <Input
                    className="p-8 text-center cursor-pointer"
                    type="name"
                    name="title"
                    placeholder="Track Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div className="mt-5 flex gap-5 flex-col items-center justify-center self-center">
                    <h1>Click below to upload a file</h1>
                    <Input
                      className="p-8 text-center cursor-pointer"
                      type="file"
                      accept=".mp3,.wav,.flac"
                      name="audio"
                      placeholder="Select Audio File"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Supported formats: MP3, WAV, FLAC (Max 100MB)
                  </p>
                  <Button
                    type="submit"
                    className="mt-10 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-2xl"
                  >
                    <IoCloudUpload className="h-4 w-4 mr-2" />
                    Upload Track
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
