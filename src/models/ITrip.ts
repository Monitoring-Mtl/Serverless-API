interface Trip {
    rootId: number;
    serviceId: string;
    tripId: number;
    tripHeadsign: string;
    directionId: number;
    shapeId: number;
    wheelchairAccessible: boolean;
    noteFr: string | null;
    noteEn: string | null;
}

export default Trip;