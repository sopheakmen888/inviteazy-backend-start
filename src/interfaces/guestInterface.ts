export interface Guest {
    guestId: string;
    eventId: string;
    attending: boolean;
    contributionAmount: number;
  }
  
  export interface GuestInsights {
    preEventGuests: { _id: string; likelyToAttend: number };
    postEventGuests: { _id: string; totalContributions: number; totalAttendees: number };
  }