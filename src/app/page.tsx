import GridBackground from "@/components/GridBackground";
import PixelText from "@/components/PixelText";
import PixelTextDemo from "@/components/PixelTextDemo";
import ProjectCard from "@/components/ProjectCard";
import About from "@/components/About";
import ExperienceCard from "@/components/ExperienceCard";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { getAllProjects } from "@/lib/projects";
import { getAboutData } from "@/lib/about";
import { getAllExperiences } from "@/lib/experience";

export default async function Home() {
  const projects = await getAllProjects();
  const aboutData = await getAboutData();
  const experiences = await getAllExperiences();

  return (
    <div className="min-h-screen">
      <GridBackground />
      <div className="container mx-auto px-4 py-16">
        {/* Header - subtle fade with no movement */}
        <ScrollAnimationWrapper animationType="fade">
          <div className="mb-12">
            <PixelText text="PORTFOLIO" scale={1.5} className="mb-8" />

            <PixelText
              text="Hover over the background grid to see the interactive effect"
              scale={0.7}
              className="mt-4"
            />
          </div>
        </ScrollAnimationWrapper>

        {/* About Me Section - moderate slide up */}
        {aboutData && (
          <ScrollAnimationWrapper
            delay={200}
            animationType="slideUp"
            animationDistance={48}
          >
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
                About Me
              </h2>
              <About aboutData={aboutData} />
            </div>
          </ScrollAnimationWrapper>
        )}

        {/* Work Experience Section - small slide up for header */}
        {experiences.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
              Work Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <ScrollAnimationWrapper
                  key={experience.slug}
                  delay={300 + index * 100}
                  animationType="slideLeft"
                  animationDistance={50} // Larger movement for more dramatic effect
                >
                  <ExperienceCard experience={experience} />
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>
        )}

        {/* Showcase projects - varied distances */}
        {/* <ScrollAnimationWrapper
          delay={150}
          animationType="slideUp"
          animationDistance={32}
        > */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
              Featured Projects
            </h2>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <ScrollAnimationWrapper
                    key={project.slug}
                    delay={300 + index * 100}
                    animationType="slideRight"
                    animationDistance={40 + index * 8} // Increasing distance for each project
                  >
                    <ProjectCard project={project} />
                  </ScrollAnimationWrapper>
                ))}
              </div>
            ) : (
              <ScrollAnimationWrapper delay={300} animationType="fade">
                <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                  <p>
                    No projects found. Add some markdown files to
                    src/content/projects/
                  </p>
                </div>
              </ScrollAnimationWrapper>
            )}
          </div>
        {/* </ScrollAnimationWrapper> */}

        {/* Interactive demos - large slide from right */}
        <ScrollAnimationWrapper
          delay={200}
          animationType="slideRight"
          animationDistance={80}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pixel Text Demo */}
            <div className="mt-8">
              <PixelTextDemo />
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
}
