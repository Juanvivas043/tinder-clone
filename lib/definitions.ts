export interface UserProfile {
    id: string;
    full_name: string;
    username: string;
    email: string;
    gender: "male" | "female" | "other";
    birthdate: string;
    bio: string;
    avatar_url: string;
    preferences: UserPreferences;
    location_lat?: number;
    location_lng?: number;
    last_active: string;
    is_verified: boolean;
    is_online: boolean;
    created_at: string;
    updated_at: string;
}

export interface UserPreferences {
    gender_preference: ("male" | "female" | "other")[];
    distance: number;
    age_range: {
        min: number;
        max: number;
    };
}

export interface ChatData {
    id: string;
    user_id: UserProfile;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    created_at: string;
    updated_at: string;
}

export interface ChatHeaderProps {
    user: UserProfile;
    onVideoCall?: () => void;
}

export interface Message {
    id: string;
    text: string;
    sender: "yo" | "otro";
    timestamp: Date;
    user_id: string;
}

export interface VideoCallProps {
    callId: string
    onCallEnd: () => void
    isIncoming: boolean
}