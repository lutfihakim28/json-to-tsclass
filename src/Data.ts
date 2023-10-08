import { Expose } from 'class-transformer'

export class Data {
  @Expose({ name: 'id' })
  public id: number

  @Expose({ name: 'referral_id' })
  public referralId: number

  @Expose({ name: 'amount' })
  public amount: string

  @Expose({ name: 'email' })
  public email: string

  @Expose({ name: 'created_at' })
  public createdAt: string

  @Expose({ name: 'target_pendukung' })
  targetSupporter: string
}