"use client";

import { Experience, calculateWorkDuration } from "@/lib/experience";
import { Calendar, MapPin, Users, ExternalLink, Building2 } from "lucide-react";
import { useState } from "react";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getDateRange = () => {
    if (experience.dateStart && experience.dateEnd) {
      return `${formatDate(experience.dateStart)} - ${formatDate(
        experience.dateEnd
      )}`;
    } else if (experience.dateStart) {
      return `${formatDate(experience.dateStart)} - Present`;
    }
    return null;
  };

  const getDuration = () => {
    return calculateWorkDuration(experience.dateStart, experience.dateEnd);
  };

  const getCustomFields = () => {
    const excludeFields = [
      "slug",
      "company",
      "position",
      "location",
      "employmentType",
      "dateStart",
      "dateEnd",
      "technologies",
      "teamSize",
      "department",
      "salary",
      "companyWebsite",
      "companyLogo",
      "companySize",
      "industry",
      "mentors",
      "content",
    ];

    return Object.entries(experience).filter(
      ([key]) => !excludeFields.includes(key)
    );
  };

  const renderContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("## ")) {
        return (
          <h4
            key={index}
            className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100"
          >
            {line.replace("## ", "")}
          </h4>
        );
      }
      if (line.startsWith("# ")) {
        return (
          <h3
            key={index}
            className="text-xl font-bold mt-2 mb-3 text-gray-900 dark:text-gray-100"
          >
            {line.replace("# ", "")}
          </h3>
        );
      }
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.*?)\*\*: (.*)/);
        if (match) {
          return (
            <div key={index} className="mb-2 ml-4">
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
          <div key={index} className="mb-1 ml-4">
            • {line.replace("- ", "")}
          </div>
        );
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      return (
        <p key={index} className="mb-2 text-gray-700 dark:text-gray-300">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
            {experience.companyLogo ? (
              <img
                src={experience.companyLogo}
                alt={experience.company}
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="w-8 h-8 text-gray-400 dark:text-gray-600" />
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {experience.position}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                {experience.companyWebsite ? (
                  <a
                    href={experience.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    {experience.company}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {experience.company}
                  </span>
                )}
                {experience.employmentType && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full text-gray-600 dark:text-gray-400">
                    {experience.employmentType}
                  </span>
                )}
              </div>
            </div>

            {/* Duration Badge */}
            {getDuration() && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium">
                {getDuration()}
              </span>
            )}
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
            {getDateRange() && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {getDateRange()}
              </div>
            )}
            {experience.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {experience.location}
              </div>
            )}
            {experience.teamSize && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                Team of {experience.teamSize}
              </div>
            )}
          </div>

          {/* Quick Info Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.technologies && (
              <div className="text-xs">
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Tech:
                </span>
                <span className="ml-1 text-gray-800 dark:text-gray-200">
                  {experience.technologies}
                </span>
              </div>
            )}
            {experience.department && (
              <div className="text-xs">
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Dept:
                </span>
                <span className="ml-1 text-gray-800 dark:text-gray-200">
                  {experience.department}
                </span>
              </div>
            )}
            {experience.industry && (
              <div className="text-xs">
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Industry:
                </span>
                <span className="ml-1 text-gray-800 dark:text-gray-200">
                  {experience.industry}
                </span>
              </div>
            )}
          </div>

          {/* Custom Fields */}
          {getCustomFields().length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {getCustomFields().map(([key, value]) => (
                  <div
                    key={key}
                    className="text-xs bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded"
                  >
                    <span className="font-medium text-gray-600 dark:text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>
                    <span className="ml-1 text-gray-800 dark:text-gray-200">
                      {Array.isArray(value) ? value.join(", ") : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expandable Content */}
          {experience.content && (
            <div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mb-2"
              >
                {isExpanded ? "Show Less" : "Show More Details"}
              </button>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="prose prose-sm prose-gray dark:prose-invert max-w-none">
                    {renderContent(experience.content)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
