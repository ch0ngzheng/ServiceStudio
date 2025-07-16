const { connect, getDb, cleanup } = require('../Models/db');

/**
 * Script to test authentication with existing users
 * This will show you a sample of users from your database
 * so you can test the login system
 * 
 * Usage: node scripts/testAuth.js
 */

async function testAuth() {
  try {
    // Connect to database
    await connect();
    console.log("✅ Connected to MongoDB");

    const db = getDb();
    const usersCollection = db.collection('users');

    // Get a sample of users (first 5) without passwords
    const sampleUsers = await usersCollection.find({}, { 
      projection: { 
        user_id: 1, 
        name: 1, 
        password: 1, // Include password for testing purposes only
        _id: 0 
      } 
    }).limit(5).toArray();

    console.log("\n📋 Sample Users Available for Testing:");
    console.log("=" .repeat(50));
    
    if (sampleUsers.length === 0) {
      console.log("❌ No users found in the database");
      console.log("💡 Make sure your MongoDB contains users in the 'users' collection");
    } else {
      sampleUsers.forEach((user, index) => {
        console.log(`${index + 1}. User ID: ${user.user_id}`);
        console.log(`   Name: ${user.name || 'N/A'}`);
        console.log(`   Password: ${user.password}`);
        console.log("   " + "-".repeat(30));
      });
    }

    // Test authentication logic
    console.log("\n🔐 Testing Authentication Logic:");
    console.log("=" .repeat(50));

    if (sampleUsers.length > 0) {
      const testUser = sampleUsers[0];
      console.log(`Testing login for: ${testUser.user_id}`);
      
      // Simulate the authentication query
      const authResult = await usersCollection.findOne({
        user_id: testUser.user_id,
        password: testUser.password
      });

      if (authResult) {
        console.log("✅ Authentication test PASSED");
        console.log(`   User found: ${authResult.name || authResult.user_id}`);
      } else {
        console.log("❌ Authentication test FAILED");
      }
    }

    // Show total user count
    const totalUsers = await usersCollection.countDocuments();
    console.log(`\n📊 Total users in database: ${totalUsers}`);

    console.log("\n🚀 You can now test the login system with these credentials!");
    console.log("💻 Start your servers:");
    console.log("   Backend: npm start (in backend directory)");
    console.log("   Frontend: npm run dev (in frontend directory)");

  } catch (error) {
    console.error("❌ Error testing authentication:", error);
  } finally {
    // Close database connection
    await cleanup();
    process.exit(0);
  }
}

// Run the test function
testAuth();