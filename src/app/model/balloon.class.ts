import { IntBalloon } from "./balloon.interface";

const colors = [
  "#FF4C4C",
  "#FFB84C",
  "#FFE74C",
  "#4CFF4C",
  "#4CDFFF",
  "#4C6CFF",
  "#B84CFF",
  "#FF4CB2",
  "#8C8C8C",
  "#000000",
  "#4CFFB8"
];

export class Balloon implements IntBalloon{
  id: string
  color: string

  constructor() {
    this.id = window.crypto.randomUUID()
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }
}
