import React,{use, useEffect,useState} from 'react'
import Service from '../utils/http';
import {Avatar} from '@mantine/core';
import { Stack, Button } from '@mantine/core';
import { Text } from '@mantine/core';
const service=new Service();
export default function Profile() {
    const [user,setUser]=useState({});
    async function getMyData(){
        try{
            let data=await service.get("user/me");
            setUser(data);
        }catch(err){
            console.log( err);
        }
    }
    useEffect(()=>{
        getMyData();
    },[])
    return (
        <div>
        <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="center"
      justify="center"
      gap="md"
    >
            <Avatar src={user.avatar} alt={user.name} radius="100%" size="xl" />
             <Text size="xl">{user.name}</Text>
            <Text c="dimmed">{user.email}</Text>
            <Text size="md"><strong>User Id :</strong>{user._id} </Text>
             <Text size="md"><strong>Account Created :</strong>{user.createdAt} </Text>
        </Stack>
        </div>
    )
}