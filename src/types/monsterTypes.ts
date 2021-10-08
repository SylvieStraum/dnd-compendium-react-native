export type MonsterSpeed = {
  burrow: string;
  climb: string;
  fly: string;
  hover: boolean;
  swim: string;
  walk: string;
};

export type MonsterSpecial_abilities = {
  desc: string;
  name: string;
};

export type MonsterSenses = {
  blindsight: string;
  darkvision: string;
  passive_perception: number;
  tremorsense: string;
  truesight: string;
};

export type MonsterReactions = {
  desc: string;
  name: string;
};

export type MonsterProficiencies = {
  proficiency: MonsterProficienciesProficiency;
  value: number;
};

export type MonsterProficienciesProficiency = {
  index: string;
  name: string;
  url: string;
};

export type MonsterLegendary_actions = {
  attack_bonus: number;
  desc: string;
  name: string;
};

export type MonsterForms = {
  index: string;
  name: string;
  url: string;
};

export type MonsterCondition_immunities = {
  index: string;
  name: string;
  url: string;
};

export type MonsterActions = {
  attack_bonus: number;
  damage: [MonsterActionsDamage];
  desc: string;
  name: string;
};

export type MonsterActionsDamage = {
  damage_dice: string;
  damage_type: MonsterActionsDamageDamage_type;
};

export type MonsterActionsDamageDamage_type = {
  index: string;
  name: string;
  url: string;
};

export type Monster = {
  _id: string;
  actions: [MonsterActions];
  alignment: string;
  armor_class: number;
  challenge_rating: number;
  charisma: number;
  condition_immunities: [MonsterCondition_immunities];
  constitution: number;
  damage_immunities: [string];
  damage_resistances: [string];
  damage_vulnerabilities: [string];
  dexterity: number;
  forms: [MonsterForms];
  hit_dice: string;
  hit_points: number;
  index: string;
  intelligence: number;
  languages: string;
  legendary_actions: [MonsterLegendary_actions];
  name: string;
  proficiencies: [MonsterProficiencies];
  reactions: [MonsterReactions];
  senses: MonsterSenses;
  size: string;
  special_abilities: [MonsterSpecial_abilities];
  speed: MonsterSpeed;
  strength: number;
  subtype: string;
  type: string;
  url: string;
  wisdom: number;
  xp: number;
};

export type SmallMonsterCall = Pick<
  Monster,
  | "challenge_rating"
  | "forms"
  | "index"
  | "name"
  | "size"
  | "speed"
  | "subtype"
  | "type"
  | "url"
  | "xp"
>;

export type SortFindManyMonsterInput =
  | "_ID_ASC"
  | "_ID_DESC"
  | "ALIGNMENT_ASC"
  | "ALIGNMENT_DESC"
  | "ARMOR_CLASS_ASC"
  | "ARMOR_CLASS_DESC"
  | "CHALLENGE_RATING_ASC"
  | "CHALLENGE_RATING_DESC"
  | "CHARISMA_ASC"
  | "CHARISMA_DESC"
  | "CONSTITUTION_ASC"
  | "CONSTITUTION_DESC"
  | "DEXTERITY_ASC"
  | "DEXTERITY_DESC"
  | "HIT_DICE_ASC"
  | "HIT_DICE_DESC"
  | "HIT_POINTS_ASC"
  | "HIT_POINTS_DESC"
  | "INDEX_ASC"
  | "INDEX_DESC"
  | "INTELLIGENCE_ASC"
  | "INTELLIGENCE_DESC"
  | "LANGUAGES_ASC"
  | "LANGUAGES_DESC"
  | "NAME_ASC"
  | "NAME_DESC"
  | "SENSES__BLINDSIGHT_ASC"
  | "SENSES__BLINDSIGHT_DESC"
  | "SENSES__DARKVISION_ASC"
  | "SENSES__DARKVISION_DESC"
  | "SENSES__TREMORSENSE_ASC"
  | "SENSES__TREMORSENSE_DESC"
  | "SENSES__TRUESIGHT_ASC"
  | "SENSES__TRUESIGHT_DESC"
  | "SIZE_ASC"
  | "SIZE_DESC"
  | "SPEED__BURROW_ASC"
  | "SPEED__BURROW_DESC"
  | "SPEED__CLIMB_ASC"
  | "SPEED__CLIMB_DESC"
  | "SPEED__FLY_ASC"
  | "SPEED__FLY_DESC"
  | "SPEED__HOVER_ASC"
  | "SPEED__HOVER_DESC"
  | "SPEED__SWIM_ASC"
  | "SPEED__SWIM_DESC"
  | "SPEED__WALK_ASC"
  | "SPEED__WALK_DESC"
  | "STRENGTH_ASC"
  | "STRENGTH_DESC"
  | "SUBTYPE_ASC"
  | "SUBTYPE_DESC"
  | "TYPE_ASC"
  | "TYPE_DESC"
  | "URL_ASC"
  | "URL_DESC"
  | "WISDOM_ASC"
  | "WISDOM_DESC"
  | "XP_ASC"
  | "XP_DESC";
