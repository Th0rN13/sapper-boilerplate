export function send (address, template, details) {
  switch (template)  {
    case 'reset-pass':
      console.log('Reset password email');
      console.log('Address:', address);
      console.log('Details:', JSON.stringify(details));
      break;
    case 'confirm-email':
      console.log('Confirm address email');
      console.log('Address:', address);
      console.log('Details:', JSON.stringify(details));
      break;
    default:
      console.log('Default email');
      console.log('Address:', address);
      console.log('Details:', JSON.stringify(details));
      break;
  }
}
