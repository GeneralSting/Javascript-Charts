// Charts
let ctx = document.getElementById('monthlySales').getContext('2d');
let pieCtx = document.getElementById('deptSales').getContext('2d');
let yearlyLabel = document.getElementById('yearlyTotal');

let monthlySales = Array.of(1200, 800, 1900);
let monthlyLabels = Array.of('Oct', 'Nov', 'Dec');

let deptSales = Array.of(1, 0, 2);
let deptLabels = Array.of('Hiking', 'Running', 'Hunting');

let octNums = Array.of(1200, 100, 900);
let novNums = Array.of(1400, 1200, 500);
let decNums = Array.of(400, 310, 700);

let yearlyTotal = 0;

function addYearlyTotal(x) {
    yearlyTotal = x + yearlyTotal;
}

monthlySales.forEach(addYearlyTotal) // === monthlySales.forEach(element => addYearlyTotal(element))
updateYearlyLabel();

function updateYearlyLabel()
{
    yearlyLabel.innerHTML = "$" + yearlyTotal;
}

// let total = Array.of(addYearlyTotal(...octNums), addYearlyTotal(...novNums), addYearlyTotal(...decNums));   //spread operator

function findOverThousand() {
    if(monthlySales.length !== 0)
    {
        let overThousand = [];
        for(let counter = 0; counter < monthlySales.length; counter++)
        {
            if(monthlySales[counter] > 1000)    
                overThousand.push(counter);
        }
        overThousand.sort(function (a, b) {  return a - b;  });
        overThousand.forEach(index => {
            alert('Month: ' + monthlyLabels[index]);
        })
    }
}

function addNewSale() {
    let customerEmail = document.getElementById('exampleInputEmail1').value;
    let customerAmount = document.getElementById('itemAmount').value;
    let setModalValidation = document.getElementById('modalValidation')

    if(customerEmail === '' || 
    customerEmail === undefined ||
    customerEmail === null || 
    customerAmount === '' ||
    customerAmount === undefined ||
    customerAmount === null) {
        setModalValidation.style.visibility = 'visible';
    }
    else {
        setModalValidation.style.visibility = 'hidden';
        monthlySales[monthlySales.length - 1] += parseInt(document.getElementById('itemAmount').value)
        yearlyTotal = 0;
        monthlySales.forEach(addYearlyTotal)
        resetModal();
        monthlySalesChart.update();
        updateYearlyLabel();
        updateDepartmentChart();
    }
}

function updateDepartmentChart()
{
    let radioValue = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    if(radioValue === 'Hiking')
        deptSales[0] += 1;
    else
        if(radioValue === 'Running')
            deptSales[1] += 1;
        else
            deptSales[2] += 1;
    deptSalesChart.update();

    document.getElementById('defaultChecked').checked = true;
}

function resetChart() {
    monthlySales.fill(0);
    yearlyTotal = 0;
    monthlySales.forEach(addYearlyTotal)
    updateYearlyLabel();
    monthlySalesChart.update();
    deptSales.fill(0);
    deptSalesChart.update();
}

function resetModal() {
    document.getElementById('exampleInputEmail1').value = '';
    document.getElementById('itemAmount').value = '';
}

// Bar
var monthlySalesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: monthlyLabels,
        datasets: [{
            label: '# of Sales',
            data: monthlySales,
            backgroundColor: [
                'rgba(238, 184, 104, 1)',
                'rgba(75, 166, 223, 1)',
                'rgba(239, 118, 122, 1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

// Pie
var deptSalesChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: deptLabels,
        datasets: [{
            label: '# of sales',
            data: deptSales,
            backgroundColor: [
                'rgba(238, 184, 104, 1)',
                'rgba(75, 166, 223, 1)',
                'rgba(239, 118, 122, 1)',
            ],
            borderWidth: 0
        }]
    },
    options: {

    }
})