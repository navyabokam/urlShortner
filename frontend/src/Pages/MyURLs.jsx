import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Group,
  Text,
  Container,
  Paper,
  Center,
  Pagination,
} from "@mantine/core";
import { IconExternalLink, IconTrash } from "@tabler/icons-react";
import Service from "../utils/http";
import axios from "axios";


const service = new Service();

export default function MyURLs() {
  const [urls, setUrls] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    async function fetchUrls() {
      try {
      const res = await axios.get(
        `https://url-shortener-bootcamp.onrender.com/api/user/my/urls?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );

      setUrls(res.data.shortURLs || []);
      setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching URLs:", err);
        setUrls([]);
      }
    }
    fetchUrls();
  }, [page]);

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this URL?")) {
      service
        .delete(`s/${id}`)
        .then(() => {
          setUrls((prev) => prev.filter((url) => url._id !== id));
        })
        .catch((err) => {
          console.error("Error deleting URL:", err);
          alert("Failed to delete URL.");
        });
    }
  }

  function handleOpen(shortCode) {
    window.open(
      `https://url-shortener-bootcamp.onrender.com/api/s/${shortCode}`,
      "_blank"
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #d9afd9 0%, #97d9e1 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 0",
      }}
    >
      <Container
        size="lg"
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Paper
          shadow="xl"
          radius={30}
          p="xl"
          style={{
            minWidth: 900,
            maxWidth: 1100,
            margin: "auto",
            backdropFilter: "blur(10px)",
            borderRadius: "30px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          <Text
            size="2.5rem"
            fw={700}
            style={{
              color: "#222",
              marginBottom: "2rem",
              textShadow: "rgba(0,0,0,0.15) 2px 2px 10px",
              fontWeight: "lighter",
              textAlign: "center",
            }}
          >
            My URLs
          </Text>

          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short Link</th>
                <th>Clicks</th>
                <th>Created</th>
                <th>Expires</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url._id}>
                  <td>
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.originalUrl.length > 40
                        ? url.originalUrl.slice(0, 40) + "..."
                        : url.originalUrl}
                    </a>
                  </td>
                  <td>{url.shortCode}</td>
                  <td>{url.clickCount || 0}</td>
                  <td>
                    {url.createdAt
                      ? new Date(url.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    {url.expiresAt ? (
                      new Date(url.expiresAt).toLocaleDateString()
                    ) : (
                      <Text c="gray">Never</Text>
                    )}
                  </td>
                  <td>
                    <Group gap={4}>
                      <Button
                        variant="subtle"
                        color="blue"
                        size="xs"
                        onClick={() => handleOpen(url.shortCode)}
                        leftSection={<IconExternalLink size={16} />}
                      />
                      <Button
                        variant="subtle"
                        color="red"
                        size="xs"
                        onClick={() => handleDelete(url._id)}
                        leftSection={<IconTrash size={16} />}
                      />
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {urls.length === 0 && (
            <Center mt="lg">
              <Text c="gray">No URLs found.</Text>
            </Center>
          )}

          {/* Pagination */}
          <Center mt="lg">
            <Pagination value={page} onChange={setPage} total={totalPages} />
          </Center>
        </Paper>
      </Container>
    </div>
  );
}
