package com.shoppymart.repository;

import com.shoppymart.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {

    @Query("{ $or: [ { 'user': ?0 }, { 'user._id': ?0 }, { 'user.$id': ?0 } ] }")
    List<Order> findByUserId(String userId);
}
