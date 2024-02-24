import {
  CheckIcon,
  HotelIcon,
  MagnetIcon,
  NewspaperIcon,
  SendIcon,
  StarIcon,
} from "lucide-react";

const features = [
  {
    title: "Feature 1",
    description:
      "Easy to understand and descriptive tags to label your tickets. Over 3 Labels, 3 priorities and 6 statuses to choose from.",
    icon: <StarIcon />,
  },
  {
    title: "Feature 2",
    description: "Dashboard to track and manage your tickets with ease.",
    icon: <HotelIcon />,
  },
  {
    title: "Feature 3",
    description:
      "Create, Edit and Delete tickets on the go with our easy to use UI/UX",
    icon: <CheckIcon />,
  },
];

export default function FeaturesCards() {
  return (
    <div className="">
      <div className="text-center">
        <h1 className="text-3xl font-bold">SaaS Features</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center mb-20 mt-10">
        {features.map((feature) => (
          <div
            className="card shadow-lg hover:shadow-2xl m-2 border"
            key={feature.title}
          >
            <div className="card-body">
              <div className="card-title text-2xl">
                {feature.icon} {feature.title}
              </div>
              <div className="card-text">{feature.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
