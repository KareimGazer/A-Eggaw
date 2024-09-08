const monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getLast12Months = (selectedDate) => {
    const monthInfo = [];

    for (let i = 0; i < 12; i++) {
        const month = selectedDate.getMonth() - i;
        const year = selectedDate.getFullYear();

        // Calculate the correct year and month
        const adjustedDate = new Date(year, month, 1);

        const firstDay = new Date(adjustedDate.getFullYear(), adjustedDate.getMonth(), 2).toISOString().split('T')[0];
        const lastDay = new Date(adjustedDate.getFullYear(), adjustedDate.getMonth() + 1, 1).toISOString().split('T')[0];

        monthInfo.push({
            index: adjustedDate.getMonth() + 1,
            name: adjustedDate.toLocaleDateString('en-US', { month: 'long' }),
            year: selectedDate.getFullYear(),
            firstDay,
            lastDay,
        });
    }

    return monthInfo;
}

const getYearsNumbers = (num) => {
    const yearInfo = [];
    const currentDate = new Date();
    for (let i = 0; i < num; i++) {
        const year = currentDate.getFullYear() - i;
        yearInfo.push(year);
    }
    return yearInfo;
}

const getMonthBoundries = (monthIndex, yearIndex) => {
    const firstDay = new Date(yearIndex, monthIndex-1, 2);
    const lastDay = new Date(yearIndex, monthIndex, 1);
    const monthName = firstDay.toLocaleDateString('en-US', { month: 'long' });
    return {
        firstDay: firstDay.toISOString().split('T')[0],
        lastDay: lastDay.toISOString().split('T')[0],
        monthName
    };
}


export { getLast12Months, getYearsNumbers, getMonthBoundries, monthsOfTheYear}