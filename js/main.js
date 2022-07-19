if (window.applicationCache) {
    function updateSite(event) {
        console.log('site updated');
        window.applicationCache.swapCache();
    }
    window.applicationCache.addEventListener('updateready', updateSite, false);
}

const version = '20220719.01';

let storageKey = 'calorieCount' + '.' + version;

let getCurrentCalorieCount = () => parseInt(localStorage.getItem(storageKey) || '0');

let updateCountView = () => {
    document.getElementById('calorieCount').innerHTML = getCurrentCalorieCount().toFixed();
}

updateCountView();

document.getElementById('addCalories').addEventListener('click', () => {
    let currentCalorieCount = getCurrentCalorieCount();
    currentCalorieCount += 100;
    localStorage.setItem(storageKey, currentCalorieCount.toFixed());
    updateCountView();
});