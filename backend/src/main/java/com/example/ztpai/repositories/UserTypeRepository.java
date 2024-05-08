package com.example.ztpai.repositories;

import com.example.ztpai.models.UserType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTypeRepository extends JpaRepository<UserType, Integer> {

    UserType findUserTypeByName(String user);
}
