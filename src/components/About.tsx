"use client";

import { AboutData } from "@/lib/about";
import { MapPin, Mail, Linkedin, Github, Globe, User } from "lucide-react";

interface AboutProps {
  aboutData: AboutData;
}

export default function About({ aboutData }: AboutProps) {
  const renderMarkdownContent = (content: string) => {
    // Simple markdown parsing for basic formatting
    return content.split("\n").map((line, index) => {
      // Headers
      if (line.startsWith("## ")) {
        return (
          <h3
            key={index}
            className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100"
          >
            {line.replace("## ", "")}
          </h3>
        );
      }
      if (line.startsWith("# ")) {
        return (
          <h2
            key={index}
            className="text-2xl font-bold mt-4 mb-4 text-gray-900 dark:text-gray-100"
          >
            {line.replace("# ", "")}
          </h2>
        );
      }

      // Lists
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.*?)\*\*: (.*)/);
        if (match) {
          return (
            <div key={index} className="mb-2">
              <strong className="text-gray-900 dark:text-gray-100">
                {match[1]}
              </strong>
              : {match[2]}
            </div>
          );
        }
      }
      if (line.startsWith("- ")) {
        return (
          <div key={index} className="mb-1">
            • {line.replace("- ", "")}
          </div>
        );
      }

      // Regular paragraphs
      if (line.trim() === "") {
        return <br key={index} />;
      }

      return (
        <p key={index} className="mb-3 text-gray-700 dark:text-gray-300">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="  rounded-lg border border-gray-200 dark:border-gray-800 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          {/* Profile Image */}
          <div className="mb-6">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {aboutData.profileImage ? (
                <img
                  src={aboutData.profileImage}
                  alt={aboutData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-24 h-24 text-gray-400 dark:text-gray-600" />
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {aboutData.name}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {aboutData.title}
            </p>
            {aboutData.location && (
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {aboutData.location}
              </div>
            )}
          </div>

          {/* Contact Links */}
          <div className="space-y-3 mb-6">
            {aboutData.email && (
              <a
                href={`mailto:${aboutData.email}`}
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                {aboutData.email}
              </a>
            )}
            {aboutData.linkedin && (
              <a
                href={aboutData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            )}
            {aboutData.github && (
              <a
                href={aboutData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            )}
            {aboutData.website && (
              <a
                href={aboutData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <Globe className="w-4 h-4 mr-2" />
                Website
              </a>
            )}
          </div>

          {/* Skills */}
          {aboutData.skills && aboutData.skills.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {aboutData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {aboutData.languages && aboutData.languages.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Languages
              </h4>
              <div className="space-y-1">
                {aboutData.languages.map((language, index) => (
                  <div
                    key={index}
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    {language}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {aboutData.interests && aboutData.interests.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {aboutData.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="lg:col-span-2">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {renderMarkdownContent(aboutData.content)}
          </div>
        </div>
      </div>
    </div>
  );
}
