 
# Features

- It should be able to send email campaigns to thousands of customers.

-> Create a Campaign

- The users of your service will use your platform to send email campaigns to their customers.

-> Add users and schedule 

- An email campaign will have properties like Name, Recipients, Timeline, Emails, Subjects.

-> Schema of the email campaign

- The user will provide a list of names, email addresses of their customers as a csv file.

-> Schema of Customers

- (Required) A single campaign can send emails to all the recipients at multiple times according to the    timeline of the campaign.

-> TimeLine - A single campaign can send multiple emails to the recipients of the campaigns. When creating a campaign, one can specify how many emails to send and **at what times**. The scheduler will schedule emails for a campaign to be sent out at their specified time. 

> 1. User creates a campaign with two emails.
> 2. The first email batch is sent to all the recipients on Monday, 22 June 2020.
> 3. The second email batch is sent to all the recipients on Friday, 26 June 2020.
> 4. The campaign ends.

A sample campaign object could look like 

```js
{
 _id: '12kj3n12j1',
 timeline: [
  {
    sendAt: 'ISOTime',
    emailInfo: {...}
    order: 1
  },
  {
    sendAt: 'ISOTime',
    emailInfo: {...}
    order: 2
  }
 ],
 ... other fields
}
```

- (Amazing to see this) The recipient of an email should be able to unsubscribe from the campaign.
- Once unsubscribed, the system will not send them an email from the currently running campaign.


- Your users can track the progress of the email campaigns they've launched. (Optional)

->Get Status
