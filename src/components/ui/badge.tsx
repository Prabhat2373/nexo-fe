// import * as React from "react";
// import { cva, type VariantProps } from "class-variance-authority";

// import { cn } from "@/lib/utils";
// import classNames from "classnames";

// const badgeVariants = cva(
//   `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`,
//   {
//     variants: {
//       variant: {
//         default: "border-transparent bg-primary text-primary-foreground ",
//         secondary: "border-transparent  ",
//         destructive:
//           "border-transparent bg-destructive text-destructive-foreground ",
//         outline: "text-foreground",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// );

// export interface BadgeProps
//   extends React.HTMLAttributes<HTMLDivElement>,
//     VariantProps<typeof badgeVariants> {}

// function Badge({ className, variant, ...props }: BadgeProps) {
//   return (
//     <div
//       className={classNames(
//         `${cn(badgeVariants({ variant }), className)} ${
//           props?.color ? `text-${props.color}-600 bg-${props.color}-300 ` : ""
//         }`
//       )}
//       {...props}
//     />
//   );
// }

// export { Badge, badgeVariants };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define a set of color mappings to Tailwind classes
const colorClasses = {
  blue: {
    text: "text-blue-600",
    background: "bg-blue-100",
  },
  red: {
    text: "text-red-600",
    background: "bg-red-100",
  },
  green: {
    text: "text-green-600",
    background: "bg-green-100",
  },
  orange: {
    text: "text-orange-600",
    background: "bg-orange-100",
  },
  purple: {
    text: "text-purple-600",
    background: "bg-purple-100",
  },
  yellow: {
    text: "text-yellow-600",
    background: "bg-yellow-100",
  },
  teal: {
    text: "text-teal-600",
    background: "bg-teal-100",
  },
  pink: {
    text: "text-pink-600",
    background: "bg-pink-100",
  },
  indigo: {
    text: "text-indigo-600",
    background: "bg-indigo-100",
  },
  gray: {
    text: "text-gray-600",
    background: "bg-gray-100",
  },
};

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground ",
        secondary: "border-transparent bg-secondary text-secondary-foreground ",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground ",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  color?: keyof typeof colorClasses;
}

function Badge({ className, variant, color, ...props }: BadgeProps) {
  const colorClass = color
    ? `${colorClasses?.[color]?.text} ${colorClasses?.[color]?.background}`
    : "";
  return (
    <div
      className={cn(badgeVariants({ variant }), colorClass, className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
