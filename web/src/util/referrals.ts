// TODO: Use @cbr/common's file instead of duplicating here
export interface IReferral {
    id: number;
    user: number;
    client: number;
    date_referred: number;
    date_resolved: number;
    resolved: boolean;
    outcome: string;
    wheelchair: boolean;
    wheelchair_experience: WheelchairExperience;
    hip_width: number;
    wheelchair_owned: boolean;
    wheelchair_repairable: boolean;
    physiotherapy: boolean;
    condition: string;
    prosthetic: boolean;
    prosthetic_injury_location: InjuryLocation;
    orthotic: boolean;
    orthotic_injury_location: InjuryLocation;
    services_other: string;
}

export interface IOutstandingReferral {
    id: number;
    full_name: string;
    date_referred: number;
    wheelchair: boolean;
    physiotherapy: boolean;
    prosthetic: boolean;
    orthotic: boolean;
    services_other: string;
}

export enum ReferralTypes {
    WHEELCHAIR = "wheelchair",
    PROSTHETIC = "prosthetic",
    ORTHOTIC = "orthotic",
}

export enum InjuryLocation {
    BELOW = "BEL",
    ABOVE = "ABO",
}

export enum WheelchairExperience {
    BASIC = "BAS",
    INTERMEDIATE = "INT",
}

export const prostheticInjuryLocations = {
    [InjuryLocation.BELOW]: "Below the knee",
    [InjuryLocation.ABOVE]: "Above the knee",
};

export const orthoticInjuryLocations = {
    [InjuryLocation.BELOW]: "Below the elbow",
    [InjuryLocation.ABOVE]: "Above the elbow",
};

export const wheelchairExperiences = {
    [WheelchairExperience.BASIC]: "Basic",
    [WheelchairExperience.INTERMEDIATE]: "Intermediate",
};
