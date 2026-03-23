// Use native global fetch

async function runTests() {
  const baseUrl = 'http://127.0.0.1:5000/api';
  console.log('--- STARTING TESTS ---');

  try {
    // 1. Login Super Admin
    let res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'password123' }),
    });
    let superAdmin = await res.json();
    console.log('Super Admin Login:', superAdmin.token ? 'SUCCESS' : 'FAILED');

    // 2. Login Normal User
    res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user1@example.com', password: 'password123' }),
    });
    let normalUser = await res.json();
    console.log('Normal User Login:', normalUser.token ? 'SUCCESS' : 'FAILED');

    // 3. Super Admin Create Blog
    res = await fetch(`${baseUrl}/blogs`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdmin.token}`
      },
      body: JSON.stringify({ title: 'Test Blog', content: 'Testing from script.' }),
    });
    let newBlog = await res.json();
    console.log('Super Admin Create Blog:', newBlog._id ? 'SUCCESS' : 'FAILED');

    // 4. Normal User Create Blog (Should fail)
    res = await fetch(`${baseUrl}/blogs`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${normalUser.token}`
      },
      body: JSON.stringify({ title: 'User Blog', content: 'Testing from script.' }),
    });
    console.log('Normal User Create Blog Status (Expected 403):', res.status);

    // 5. Get Blogs (Public/Any)
    res = await fetch(`${baseUrl}/blogs`);
    let blogs = await res.json();
    console.log(`Get Blogs returned ${blogs.length} items`);

    // 6. Super Admin Delete Blog
    if (newBlog._id) {
      res = await fetch(`${baseUrl}/blogs/${newBlog._id}`, {
        method: 'DELETE',
        headers: { 
          Authorization: `Bearer ${superAdmin.token}`
        },
      });
      let delRes = await res.json();
      console.log('Super Admin Delete Blog:', delRes.message === 'Blog removed' ? 'SUCCESS' : 'FAILED');
    }

    console.log('--- ALL TESTS COMPLETED ---');
    process.exit(0);

  } catch (err) {
    console.error('Test Failed Exception:', err);
    process.exit(1);
  }
}

setTimeout(runTests, 2000); // Give server time to start
