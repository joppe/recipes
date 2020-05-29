export type ValidConfig<Structure, Template> = Structure extends Template
    ? Structure
    : never;
