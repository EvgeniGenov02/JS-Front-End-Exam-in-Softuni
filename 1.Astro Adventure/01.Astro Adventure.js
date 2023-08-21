function solv(info) {
    let numberOfAstronauts = Number(info.splice(0, 1));

    let astronautsTokenArr = info.splice(0, numberOfAstronauts);

    let arrWithAstronauts = [];

    for (let index = 0; index < astronautsTokenArr.length; index++) {
        let astronautProps = astronautsTokenArr[index].split(" ");

        let objAstronaut = {};

        objAstronaut.name = astronautProps[0];
        objAstronaut.oxygenLevel = Number(astronautProps[1]);
        objAstronaut.energyReserves = Number(astronautProps[2]);

        arrWithAstronauts.push(objAstronaut);
    }

    let i = 0;
    while (true) {

        let comandTokens = info[i].split(" - ");

        //End
        if (comandTokens[0] === 'End') {
            break;
        }

        //Explore
        else if (comandTokens[0] === 'Explore') {
            let astronautName = comandTokens[1];
            let needEnergy = Number(comandTokens[2]);

            for (let index = 0; index < arrWithAstronauts.length; index++) {
                if (arrWithAstronauts[index].name === astronautName) {
                    if (arrWithAstronauts[index].energyReserves >= needEnergy) {
                        arrWithAstronauts[index].energyReserves -= needEnergy;
                        console.log(`${astronautName} has successfully explored a new area and now has ${arrWithAstronauts[index].energyReserves} energy!`);
                    }
                    else {
                        console.log(`${astronautName} does not have enough energy to explore!`);
                    }
                    break;
                }
            }
        }
        //Refuel
        else if (comandTokens[0] === 'Refuel') {
            let astronautName = comandTokens[1];
            let energyRefuel = Number(comandTokens[2]);

            for (let index = 0; index < arrWithAstronauts.length; index++) {

                if (arrWithAstronauts[index].name === astronautName) {
                    if (arrWithAstronauts[index].energyReserves + energyRefuel <= 200) {
                        arrWithAstronauts[index].energyReserves += energyRefuel;
                        console.log(`${arrWithAstronauts[index].name} refueled their energy by ${energyRefuel}!`);
                        break;
                    } else {
                        console.log(`${arrWithAstronauts[index].name} refueled their energy by ${200 - arrWithAstronauts[index].energyReserves}!`);
                        arrWithAstronauts[index].energyReserves = 200;
                        break;
                    }
                }

            }

        } 
        //Breathe 
        else if (comandTokens[0] === 'Breathe') {
            let astronautName = comandTokens[1];
            let breatheRefuel = Number(comandTokens[2]);

            for (let index = 0; index < arrWithAstronauts.length; index++) {

                if (arrWithAstronauts[index].name === astronautName) {
                    if (arrWithAstronauts[index].oxygenLevel + breatheRefuel <= 100) {
                        arrWithAstronauts[index].oxygenLevel += breatheRefuel;
                        console.log(`${arrWithAstronauts[index].name} took a breath and recovered ${breatheRefuel} oxygen!`);
                        break;
                    } else {
                        console.log(`${arrWithAstronauts[index].name} took a breath and recovered ${100 - arrWithAstronauts[index].oxygenLevel} oxygen!`);
                        arrWithAstronauts[index].oxygenLevel = 100;
                        break;
                    }
                }

            }

        }
        i++;
    }

    for (let index = 0; index < arrWithAstronauts.length; index++) {
        
        let astronaut = arrWithAstronauts[index].name;
        let oxygen =  arrWithAstronauts[index].oxygenLevel;
        let energy = arrWithAstronauts[index].energyReserves;

        console.log(`Astronaut: ${astronaut}, Oxygen: ${oxygen}, Energy: ${energy}`)
        
    }
}
solv(
    ['3',
        'John 50 120',
        'Kate 80 180',
        'Rob 70 150',
        'Explore - John - 50',
        'Refuel - Kate - 30',
        'Breathe - Rob - 20',
        'End']
)