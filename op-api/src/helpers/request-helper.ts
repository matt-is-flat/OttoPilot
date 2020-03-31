export default class RequestHelper {
    static ExtractBody(eventBody: string | null): any {
        if (eventBody) {
            return JSON.parse(eventBody);
        }

        return null;
    }
}