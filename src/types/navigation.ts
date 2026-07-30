//Navigation에서 사용하는
//화면(Screen) 목록

//TypeScript가
//화면 이름을 검사하기 위해 사용한다

export type AuthStackParamList = {
    Language: undefined;
    Login: undefined;
    Register: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    MyEvents: undefined;
    Create: undefined;
    Profile: undefined;
    
}

export type AppStackParamList = {
    MainTabs: undefined;
    EventDetail: {eventId: number};
    HostedEventScreen: { eventId: number }; 
    ManageParticipants: {eventId: number};
    MyEventScreen: {eventId: number};
    EditEvent: {eventId: number};
}