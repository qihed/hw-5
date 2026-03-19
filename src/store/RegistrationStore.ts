import { makeAutoObservable, runInAction } from "mobx";
import { MetaModel } from "store/MetaModel";
import { register } from "api/auth";

export class RegistrationStore {
    username: string = "";
    email: string = "";
    phone: string = "";
    password: string = ""
    confirmPassword: string = ""
    agreeTerms: boolean = false

    readonly meta = new MetaModel()

    constructor() { makeAutoObservable(this, {}, { autoBind: true }) }

    setUsername(value: string) { this.username = value }
    setEmail(value: string) { this.email = value }
    setPhone(value: string) { this.phone = value }
    setPassword(value: string) { this.password = value }
    setConfirmPassword(value: string) { this.confirmPassword = value }
    setAgreeTerms(value: boolean) { this.agreeTerms = value }

    async registration() {
        this.meta.start()
        try {
            await register(this.username, this.email, this.password)
            runInAction(() => { this.meta.finish() })

        } catch (e) {
            this.meta.fail(e)
        }

    }

    reset() {
        this.username = "";
        this.email = "";
        this.phone = "";
        this.password = ""
        this.confirmPassword = ""
        this.agreeTerms = false
    }
}
