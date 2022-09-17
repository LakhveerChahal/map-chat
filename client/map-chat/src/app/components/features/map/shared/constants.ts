import { environment } from 'src/environments/environment';

export const constants = {
    defaultMapConfig: {
        style: 'mapbox://styles/mapbox/streets-v11',
        center: {
            lng: 73.9426952,
            lat: 18.5501796
        },
        zoom: 9,
        accessToken: environment.mapboxAccessToken,
    },
    url: {
        authUrl: 'auth',
        userUrl: 'user',
        signupUrl: 'signup',
        signinUrl: 'signin',
        signoutUrl: 'signout',
        authenticateUrl: 'authenticate',
        friendsUrl: 'friends',
        peopleUrl: 'people',
        chatUrl: 'chat',
        peopleSearch: 'search',
        request: 'request',
        acceptRequest: 'accept-request',
        metadata: 'metadata',
    },
    searchText: 'searchText',
    limit: 'limit',
    offset: 'offset',
    defaultLimit: 10,
    active: 'active',
    received: 'received',
    sent: 'sent'
};