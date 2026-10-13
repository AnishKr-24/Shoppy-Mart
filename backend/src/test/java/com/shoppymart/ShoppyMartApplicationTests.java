package com.shoppymart;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
        "spring.data.mongodb.uri=mongodb://localhost:27017/test_db",
        "jwt.secret=test_jwt_secret_key_1234567890_test_jwt_secret_key_1234567890"
})
class ShoppyMartApplicationTests {

    @Test
    void contextLoads() {
    }
}
