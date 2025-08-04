package com.example.order_service.service;

import com.example.order_service.model.Orders;
import com.example.order_service.repository.OrderRepository;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Orders createOrders(Orders order) {
        order.setOrderId(UUID.randomUUID());
        order.setOrderDate(Instant.now());
        order.setInvoiceFileUrl("http://localhost:8080/uploads/" + order.getOrderId() + ".pdf");
        System.out.println("SNS Notification: Order created - " + order.getOrderId());
        return repository.save(order);
    }

    public List<Orders> getAllOrders() {
        return repository.findAll();
    }

    public Optional<Orders> getOrdersById(UUID id) {
        return repository.findById(id);
    }
}
