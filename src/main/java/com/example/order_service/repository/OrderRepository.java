package com.example.order_service.repository;


import com.example.order_service.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Orders, UUID> {
	
	Optional<Orders> findById(UUID id);

}
