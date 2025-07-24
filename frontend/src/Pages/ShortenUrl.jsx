import React from 'react'
import { useState } from 'react';
import { Container, TextInput } from '@mantine/core';
import { Stack, Button } from '@mantine/core';
import { Text } from '@mantine/core';
import { CopyButton,  Group} from '@mantine/core';
import Service from '../utils/http';

const service = new Service();
export default function ShortenUrl() {
    async function generateShortUrl(){
        try{
            let data=await service.post("s",input);
            setResponse(data);
            console.data(data);
        }catch(err){
            console.error(err);
        }
    }
    const [input, setInput] = useState({
        "originalUrl": "",
        "expiresAt": '',
        "title": '',
        "CustomUrl": ''
    })
    const [response, setResponse] = useState(null);
    return (
        <Container size={"xs"}>
            {response ? (
                <Stack m="xl" align="center">
                    <Text size="lg" fw={500}>Your Shortened URL:</Text>
                    <Group>
                        <TextInput
                            value={service.getBaseURL() + "/api/s/" + response.shortCode}
                            readOnly
                            style={{ width: 300 }}
                        />
                        <CopyButton value={service.getBaseURL() + "/api/s/" + response.shortCode}>
                            {({ copied, copy }) => (
                                <Button color={copied ? 'green' : 'blue'} onClick={copy}>
                                    {copied ? 'Copied!' : 'Copy'}
                                </Button>
                            )}
                        </CopyButton>
                        <Button
                            color="teal"
                            onClick={() => window.open(service.getBaseURL() + "/api/s/" + response.shortCode, "_blank")}
                        >
                            Go
                        </Button>
                    </Group>
                </Stack>
            ) : (
                <Stack m="xl">
                    <Text size="30px" style={{"textShadow":"1px 2px 10px"}}>Shorten Your Url Here</Text>
                    <TextInput onChange={(e)=>{setInput({...input,originalUrl:e.target.value});
                    }}required
                        label="Original URL"
                        description=""
                        placeholder="Paste original URL"
                    />
                    <TextInput onChange={(e)=>{setInput({...input,CustomUrl:e.target.value});
                    }}
                        label="Customize your link ( Optional )"
                        description=""
                        placeholder="Customize your link "
                    />
                    <TextInput onChange={(e)=>{setInput({...input,title:e.target.value});
                    }}
                        label="Title ( Optional )"
                        description=""
                        placeholder="Title Of URL"
                    />
                    <TextInput onChange={(e)=>{setInput({...input,expiresAt:e.target.value});
                    }} type='date'
                        label="Date of Expiry ( Optional )"
                        description=""
                        placeholder="Title Of URL"
                    />
                    <Button disabled={input.originalUrl.length<5} onClick={()=>{generateShortUrl()}}>Generate And Shorten URL</Button>
                </Stack>
            )}
        </Container>
    )
}