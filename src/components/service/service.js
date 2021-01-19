export default class Service {

    async getResources(url) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`could not fetch ${url} received ${res.status}`);
        }
        return await res.json();
    }

    async getReminders(url) {
        return await this.getResources(url);
    }

    async getRemindersNumber(url) {
        return await this.getResources(url).length + 1;
    }

    async setReminder(url, reminder) {
        //const number = await this.getRemindersNumber();
        /*const newReminder = {
            id: number,
            reminder: reminder
        }*/
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(reminder)
        });
        if (!response.ok){
            throw new Error('json error'); 
        }
    } 
}