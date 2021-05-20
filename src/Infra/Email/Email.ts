import * as sendgrid from '@sendgrid/mail'

import { from, apiKey } from './settings'
import { Template, Document, Data } from './Models'

sendgrid.setApiKey(apiKey)

export default class Email {
  static async send <T extends Data, U extends Document<T>, V extends Template<T, U>> (template: V): Promise<void> {
    const personalizations = []
    for (const doc of template.documents) {
      const data = await doc.data.getValue()
      personalizations.push({
        to: [{ email: doc.to }],
        dynamicTemplateData: data
      })
    }

    await sendgrid.send({ from, templateId: template.id, personalizations })
  }
}
