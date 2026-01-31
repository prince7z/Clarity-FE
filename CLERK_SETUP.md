# Clerk Authentication Setup for Clarity AI

This guide walks you through setting up Clerk authentication for the Clarity AI platform.

## Quick Start

### 1. Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Copy your **Publishable Key** from the dashboard

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

### 3. Install Dependencies

```bash
npm install @clerk/clerk-react
```

### 4. Start the Development Server

```bash
npm run dev
```

## What's Included

### Authentication Pages
- **Sign In**: `/sign-in` - Enterprise-styled sign-in page
- **Sign Up**: `/sign-up` - Registration page for new users

### Protected Routes
- `/studio` - PPT generation workspace (requires authentication)
- `/presentation` - Presentation view (requires authentication)

### Public Routes
- `/` - Landing page
- `/features` - Features page
- `/pricing` - Pricing page
- `/contact` - Contact page

## Clerk Dashboard Configuration

### Recommended Settings for Enterprise

1. **Sign-in Options**
   - Enable Email/Password
   - Enable OAuth (Google, Microsoft for enterprise SSO)
   - Optional: Enable passwordless (email links/magic links)

2. **Sign-up Restrictions**
   - For enterprise: Enable email domain allowlist
   - Add your company domains

3. **Session Management**
   - Set session timeout (default: 7 days)
   - Enable multi-session support for flexibility

4. **User Profile**
   - Collect: First Name, Last Name, Company Name
   - Optional: Phone number, Job title

5. **Paths** (already configured in code)
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in redirect: `/studio`
   - After sign-up redirect: `/studio`

## Customization

### Styling

The Clerk components are styled to match Clarity AI's design system:
- Glass morphism effects
- Gradient primary buttons
- Border colors matching the theme
- Responsive design

### Adding More User Fields

Edit the Clerk dashboard under "User & Authentication" > "Email, Phone, Username" to add custom fields.

### Enterprise Features (Paid Plans)

- **SSO/SAML**: Configure in Clerk dashboard under "SSO"
- **Multi-factor Auth**: Enable in "Security" settings
- **Role-based Access Control (RBAC)**: Use Clerk organizations
- **Audit Logs**: Available in Business plan

## Testing Authentication

1. Start the dev server: `npm run dev`
2. Navigate to `http://localhost:8080`
3. Click "Get started" or "Sign in"
4. Create a test account
5. You'll be redirected to `/studio` after sign-up

## Production Deployment

### Environment Variables

Set `VITE_CLERK_PUBLISHABLE_KEY` in your deployment platform:

**Vercel:**
```bash
vercel env add VITE_CLERK_PUBLISHABLE_KEY
```

**Netlify:**
Add in Site settings > Environment variables

### Clerk Production Instance

1. In Clerk dashboard, switch to "Production" instance
2. Copy the **Production Publishable Key**
3. Update your production environment variable

## Troubleshooting

### "Missing Clerk Publishable Key" Error
- Ensure `.env.local` exists and has `VITE_CLERK_PUBLISHABLE_KEY`
- Restart the dev server after adding env variables

### Sign-in Page Not Loading
- Check that Clerk dashboard has paths configured
- Verify publishable key is correct
- Check browser console for errors

### Users Can't Access Studio
- Verify the route is wrapped in `<ProtectedRoute>`
- Check that Clerk provider is wrapping the entire app
- Ensure sign-in is successful (check Clerk dashboard users)

## Security Best Practices

1. **Never commit** `.env.local` to version control
2. Use different Clerk instances for development/production
3. Enable MFA for admin accounts
4. Set up webhooks to sync user data to your database
5. Configure session timeout based on security requirements
6. Use Clerk Organizations for enterprise team management

## Support

- Clerk Docs: [https://clerk.com/docs](https://clerk.com/docs)
- Clerk Discord: [https://clerk.com/discord](https://clerk.com/discord)
- Clarity AI Issues: Contact your admin or check project repo

## Next Steps

- [ ] Set up Clerk webhooks to sync user data
- [ ] Configure organization/team features
- [ ] Add role-based permissions for enterprise plans
- [ ] Set up SSO for enterprise customers
- [ ] Integrate usage tracking with Clerk user metadata
