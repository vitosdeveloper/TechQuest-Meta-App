export class Lesson {
  constructor(
    public readonly id: string,
    public readonly path: string,
    public readonly title?: string,
    public readonly content?: string
  ) {}
}
