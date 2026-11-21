import type { ReactNode } from "react";
import {
  AnswerVignette,
  EatVignette,
  ReadVignette,
  ShowVignette,
} from "./pixel/vignettes";

interface Step {
  body: string;
  scene: ReactNode;
  title: string;
}

const steps: readonly Step[] = [
  {
    title: "Show the card",
    body: "Before you order, hand it over and ask for it to go to the kitchen.",
    scene: <ShowVignette />,
  },
  {
    title: "They read it",
    body: "In their own language: peanuts, peanut oil, sauces, shared woks. Nothing lost in translation.",
    scene: <ReadVignette />,
  },
  {
    title: "They say yes or no",
    body: "The card asks one clear question: can you make this safe? You get a real answer, not a polite nod.",
    scene: <AnswerVignette />,
  },
  {
    title: "You eat with confidence",
    body: "A yes means the kitchen has confirmed it. A no means you thank them and find somewhere that can.",
    scene: <EatVignette />,
  },
];

/** The four beats of a meal abroad, each with a small looping scene. */
export const MealSteps = () => (
  <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
    {steps.map((step, index) => (
      <li key={step.title}>
        <div className="px-frame">{step.scene}</div>
        <p className="font-tiny text-tiny2 text-go-dark mt-6">
          Step {index + 1}
        </p>
        <h3 className="font-pixel text-px1 mt-2">{step.title}</h3>
        <p className="mt-2 text-lg">{step.body}</p>
      </li>
    ))}
  </ol>
);
