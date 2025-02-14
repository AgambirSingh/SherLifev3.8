import { RESOURCES } from "../data/resources";
function Resources() {

  return (
    <div className="relative">
      {/* Resources Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {RESOURCES.map((resource) => {
          const Icon = resource.icon;
          return (
            <a
              key={resource.title}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 " />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {resource.title}
                  </h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    {resource.description}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Resources;