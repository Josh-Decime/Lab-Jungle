import { AppState } from "../AppState.js"
import { jumbledService } from "../services/jumbleService.js"
import { getFormData } from "../utils/FormHandler.js"

export class jumbleController {


    constructor() {
        this.drawJumble()
        AppState.on('activeJumble', this.drawActiveJumble)
        AppState.on('jumbles', this.drawJumble)

    }

    drawJumble() {
        // console.log('its Jumblin time', this.drawJumble)
        const jumbles = AppState.jumbles
        let template = ''
        jumbles.forEach(JumbleElm => {

            template += JumbleElm.ListTemplate

        })
        document.getElementById('draw-jumble').innerHTML = template
    }
    selectJumble(jumbled) {
        jumbledService.selectedJumble(jumbled)
    }

    drawActiveJumble() {
        const jumble = AppState.activeJumble
        document.getElementById('active-jumble').innerHTML = jumble.ActiveTemplate
    }
    submitJumble() {
        event.preventDefault()
        let form = event.target
        const userJumble = getFormData(form)
        console.log(userJumble)
        jumbledService.submitJumble(userJumble)
    }
    checkSubmission() {
        //@ts-ignore
        let submission = document.getElementById('submitted-jumble').value
        console.log(submission)
        if (submission == AppState.activeJumble.body) {
            jumbledService.endTime()
            window.alert(`You got it right!! ${AppState.activeJumble.fastestTime}s`)

        }
        else {
            window.alert('loser')
        }
    }
}