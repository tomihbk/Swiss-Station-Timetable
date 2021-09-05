export enum ActionType {
    ADD_TRIPS = 'ADD_TRIPS',
    REMOVE_TRIPS = 'REMOVE_TRIPS',
    ADD_API_REQUEST = 'ADD_API_REQUEST'
}

export interface ApiBodyTypeData {
    RequestorReference: string;
    RequestCurrentTimeStamp?: string;
    StopPlaceReference: string;
    NumberOfResult: string;
    ArrivalOrDepature: string;
    ArrivalOrDepatureTime: string;
    EnableRealTimeData: string;
    IncludePreviousCalls: string;
    IncludeOnwardCalls: string;
}
