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

export type BaseMonsterAction = {
  attack_bonus?: number;
  damage?: string;
  name: string;
  desc: string;
};

export type DjangoMonster = {
  actions: BaseMonsterAction[];
  alignment: string;
  armor_class: number;
  armor_desc: string;
  challenge_rating: number;
  charisma: number;
  charisma_save: number;
  condition_immunities: string;
  constitution: number;
  constitution_save: number;
  damage_immunities: string;
  damage_resistances: string;
  damage_vulnerabilities: string;
  dexterity: number;
  dexterity_save: number;
  document__license_url: string;
  document__slug: string;
  document__title: string;
  group: string;
  hit_dice: string;
  hit_points: number;
  img_main: string;
  intelligence: number;
  intelligence_save: number;
  languages: string;
  legendary_actions: BaseMonsterAction[];
  legendary_desc: string;
  name: string;
  perception: string;
  reactions: BaseMonsterAction[];
  senses: string;
  size: string;
  skills: Record<string, any>;
  slug: string;
  special_abilities: BaseMonsterAction[];
  speed: Record<string, any>;
  spell_list: [];
  strength: number;
  strength_save: number;
  subtype: string;
  type: string;
  wisdom: number;
  wisdom_save: number;
};

// const MONSTER_BY_NAME = gql`
//   query GetMonster($name: String!) {
//     monster(filter: { name: $name }) {
//       actions {
//         name
//         desc
//         attack_bonus
//         damage {
//           damage_dice
//           damage_type {
//             index
//             name
//             url
//           }
//         }
//       }
//       alignment
//       armor_class
//       challenge_rating
//       charisma
//       condition_immunities {
//         index
//         name
//         url
//       }
//       constitution
//       damage_immunities
//       damage_resistances
//       damage_vulnerabilities
//       dexterity
//       forms {
//         index
//         name
//         url
//       }
//       hit_dice
//       hit_points
//       index
//       intelligence
//       languages
//       legendary_actions {
//         attack_bonus
//         desc
//         name
//       }
//       name
//       proficiencies {
//         proficiency {
//           index
//           name
//           url
//         }
//         value
//       }
//       reactions {
//         desc
//         name
//       }
//       senses {
//         blindsight
//         darkvision
//         passive_perception
//         tremorsense
//         truesight
//       }
//       size
//       special_abilities {
//         desc
//         name
//       }
//       speed {
//         burrow
//         climb
//         fly
//         hover
//         swim
//         walk
//       }
//       strength
//       subtype
//       type
//       url
//       wisdom
//       xp
//     }
//   }
// `;
// interface ApolloMonster {
//   monster: Monster;
// }

// interface ApolloMonsters {
//   monsters: SmallMonsterCall[];
// }
// const MONSTER_DATA = gql`
//   query GetAllMonsterData($skip: Int, $sort: SortFindManyMonsterInput) {
//     monsters(skip: $skip, sort: $sort, limit: 100) {
//       challenge_rating
//       index
//       name
//       size
//       subtype
//       type
//       url
//       xp
//     }
//   }
// `;
// const [fetchMonsters, { data, fetchMore, loading, refetch }] = useLazyQuery(
//   MONSTER_DATA,
//   {
//     fetchPolicy: "cache-and-network",
//     nextFetchPolicy: "network-only",
//     variables: {
//       skip: monstersArr.length ?? 0,
//       sort: sortStyle,
//     },
//   }
// );

// useEffect(() => {
//   setMonstersArr((prev) => (prev.length ? prev : data?.monsters ?? []));
// }, [data]);
